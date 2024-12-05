import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    function generateToken() {
      return Math.random().toString(36).substring(2);
    }
    if (username === "admin" && password === "admin") {
      localStorage.setItem("authToken", generateToken());
      navigate("/players");
    } else {
      alert("Invalid Credentials");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 500;

    // Star Class for generating stars
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.radius = Math.random() * 1.5;
      }

      update() {
        this.z -= 2;
        if (this.z <= 0) {
          this.reset();
        }
      }

      draw() {
        const x =
          (this.x - canvas.width / 2) * (canvas.width / this.z) +
          canvas.width / 2;
        const y =
          (this.y - canvas.height / 2) * (canvas.width / this.z) +
          canvas.height / 2;
        const radius = this.radius * (canvas.width / this.z);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }

    // Create a set of stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Animate the stars and keep the background moving
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Apply a slight fade for each frame
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate); // Recursively call animate to create the animation loop
    };

    animate();

    // Sonic Boom Effect on click
    const sonicBoom = (event) => {
      const sonicBoomX = event.clientX;
      const sonicBoomY = event.clientY;
      let boomRadius = 0;

      function expandBoom() {
        ctx.beginPath();
        ctx.arc(sonicBoomX, sonicBoomY, boomRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - boomRadius / 100})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        boomRadius += 2;
        if (boomRadius < 100) {
          requestAnimationFrame(expandBoom); // Continue expanding the sonic boom
        }
      }

      expandBoom();
    };

    window.addEventListener("click", sonicBoom);

    // Adjust the canvas size dynamically on window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("click", sonicBoom);
      window.removeEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
        }}
      ></canvas>
      <div className="glass-container">
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="search-bar"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="search-bar"
        />
        <button class="button-91" onClick={login}>
          <span class="text">Login</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
