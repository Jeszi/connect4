import React from "react";

interface ScoreBoardProps {
  yellowScore: number;
  redScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  yellowScore,
  redScore
}) => {
  const getScoreText = (score: number) =>
    score === 1 ? `${score} win` : `${score} wins`;

  return (
    <div>
      <table className="Scoreboard" cellPadding="2">
        <tr>
          <td>Red</td>
          <td>Yellow</td>
        </tr>
        <tr>
          <td>{getScoreText(redScore)}</td>
          <td>{getScoreText(yellowScore)}</td>
        </tr>
      </table>
    </div>
  );
};
