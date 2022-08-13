import { Box, Container } from '@chakra-ui/layout';
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';

export default function Bracket() {
  // NEED TO USE GAME ARRAY/INFO TO SEPARATE MATCHES FOR SPECIFIC TOURNAMENT GAME?

    const matches = [
        {
          "id": 19753,
          "nextMatchId": null,
          "tournamentRoundText": "3",
          "state": "SCHEDULED",
          "participants": []
        },
        {
          "id": 19754,
          "nextMatchId": 19753,
          "tournamentRoundText": "2",
          "state": "SCHEDULED",
          "participants": [
            {
              "id": "14754a1a-932c-4992-8dec-f7f94a339960",
              "resultText": null,
              "isWinner": false,
              "status": null,
              "name": "CoKe BoYz",
            }
          ]
        },
        {
          "id": 19755,
          "nextMatchId": 19754,
          "tournamentRoundText": "1",
          "state": "SCORE_DONE",
          "participants": [
            {
              "id": "14754a1a-932c-4992-8dec-f7f94a339960",
              "resultText": "Won",
              "isWinner": true,
              "status": "PLAYED",
              "name": "CoKe BoYz",
            },
            {
              "id": "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
              "resultText": "Lost",
              "isWinner": false,
              "status": "PLAYED",
              "name": "Aids Team",
            }
          ]
        },
        {
          "id": 19756,
          "nextMatchId": 19754,
          "tournamentRoundText": "1",
          "state": "RUNNING",
          "participants": [
            {
              "id": "d8b9f00a-0ffa-4527-8316-da701894768e",
              "resultText": null,
              "isWinner": false,
              "status": null,
              "name": "Art of kill",
            }
          ]
        },
        {
          "id": 19757,
          "nextMatchId": 19753,
          "tournamentRoundText": "2",
          "state": "SCHEDULED",
          "participants": []
        },
        {
          "id": 19758,
          "nextMatchId": 19757,
          "tournamentRoundText": "1",
          "state": "SCHEDULED",
          "participants": [
            {
              "id": "9397971f-4b2f-44eb-a094-722eb286c59b",
              "resultText": null,
              "isWinner": false,
              "status": null,
              "name": "Crazy Pepes",
            }
          ]
        },
        {
          "id": 19759,
          "nextMatchId": 19757,
          "tournamentRoundText": "1",
          "state": "SCHEDULED",
          "participants": [
            {
              "id": "42fecd89-dc83-4821-80d3-718acb50a30c",
              "resultText": null,
              "isWinner": false,
              "status": null,
              "name": "BLUEJAYS",
            },
            {
              "id": "df01fe2c-18db-4190-9f9e-aa63364128fe",
              "resultText": null,
              "isWinner": false,
              "status": null,
              "name": "Bosphorus",
            }
          ]
        }
      ]

    return (
        <Container centerContent width={"90vw"}>
            <SingleEliminationBracket
            matches={matches}
            matchComponent={Match}
            svgWrapper={({ children, ...props }) => (
            <SVGViewer width={1200} height={750} {...props}>
                {children}
            </SVGViewer>
    )}
  />

        </Container>
    )
}

// export const DoubleElimination = () => (
//   <DoubleEliminationBracket
//     matches={matches}
//     matchComponent={Match}
//     svgWrapper={({ children, ...props }) => (
//       <SVGViewer width={500} height={500} {...props}>
//         {children}
//       </SVGViewer>
//     )}
//   />
// );
export const SingleElimination = (matches) => (

  <SingleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);