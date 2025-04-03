import React from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Image,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import mpcup from "../../assets/images/mpcup.png";
import mpcupdetails from "../../assets/images/mpcupdetails.jpeg";

export const Tournaments = () => {
  const activeTournament = "mpcup2025";
  const tournaments = [
    {
      id: "mpcup2025",
      tournamentName: "Bankura MP Cup 2025",
      logo: mpcup,
      season: "Season 1",
      details: mpcupdetails,
      teams: [
        { name: "Bankura Blasters", logo: mpcup },
        { name: "Bankura Municipality Kings", logo: mpcup },
        { name: "Chhatna Capitals", logo: mpcup },
        { name: "Raipur Warriors", logo: mpcup },
        { name: "Taldangra Titans", logo: mpcup },
        { name: "Saltora SuperGiants", logo: mpcup },
        { name: "Ranibandh Rangers", logo: mpcup },
        { name: "Raghunathpur Royals", logo: mpcup },
      ],
    },
  ];

  return (
    <div className="container mt-4 mb-4">
      <Accordion defaultActiveKey={activeTournament}>
        {tournaments.map((tournament) => (
          <Accordion.Item
            eventKey={tournament.id}
            key={tournament.id}
            className="border-0 shadow-sm"
          >
            <Accordion.Header className="bg-primary text-white">
              {tournament.tournamentName}
            </Accordion.Header>
            <Accordion.Body className="bg-light">
              <Card className="border-0">
                <Card.Img
                  variant="top"
                  src={tournament.logo}
                  alt={tournament.tournamentName}
                  className="img-fluid w-25 mx-auto d-block mt-2"
                />
                <Card.Body className="text-center">
                  <Card.Title className="text-dark fw-bold">
                    {tournament.tournamentName}
                  </Card.Title>
                  <Tabs defaultActiveKey="details" className="mb-3" justify>
                    <Tab eventKey="details" title="Details">
                      <Image
                        src={tournament.details}
                        alt="Details"
                        className="img-fluid w-100 rounded"
                      />
                    </Tab>
                    <Tab eventKey="teams" title="Teams">
                      <Row className="g-2">
                        {tournament.teams.map((team, index) => (
                          <Col
                            key={index}
                            xs={6}
                            // sm={6}
                            className="d-flex justify-content-center"
                          >
                            <button
                              variant="outline-primary"
                              className="w-100 d-flex align-items-center justify-content-center flex-column p-2 m-2 rounded"
                              style={{
                                background:
                                  "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
                              }}
                            >
                              {/* <Image
                                src={team.logo}
                                alt={team.name}
                                className="me-2"
                                style={{ width: "50px", height: "50px" }}
                              /> */}
                              <span className="text-center color-white">
                                {team.name}
                              </span>
                            </button>
                          </Col>
                        ))}
                      </Row>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};
