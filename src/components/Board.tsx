import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getBoard, getCurrentPlayer, getWinner } from "../reducers/selectors";
import { dropCoin } from "../actions/dropCoin";
import { resetGame } from "../actions/resetGame";
import { Color } from "../types";
import { Row } from "./Row";
import { ScoreBoard } from "./ScoreBoard";

interface BoardComponentProps {
  board: ReturnType<typeof getBoard>;
  color: ReturnType<typeof getCurrentPlayer>;
  winner: ReturnType<typeof getWinner>;
  dropCoin: typeof dropCoin;
  resetGame: typeof resetGame;
}

interface BoardComponentState {
  yellow: number;
  red: number;
}

export class BoardComponent extends React.Component<
  BoardComponentProps,
  BoardComponentState
> {
  state = {
    yellow: 0,
    red: 0
  };

  componentDidUpdate(prevProps: BoardComponentProps) {
    const { winner } = this.props;
    if (winner !== prevProps.winner && winner !== null) {
      this.addScore(winner.color);
    }
  }

  addScore = (color: Color) => {
    if (color !== null) {
      this.setState<never>(prevState => ({
        [color]: prevState[color] + 1
      }));
    }
  };

  dropCoin = (column: number) => () => {
    // we only allow a player to drop a coin if there is no winner yet
    if (!this.props.winner) {
      this.props.dropCoin(column, this.props.color);
    }
  };

  displayHeader() {
    // only display the winner if there is one
    if (this.props.winner) {
      return <h2>Congratulations, {this.props.winner.color} wins the game!</h2>;
    } else {
      return <h2>It's {this.props.color}'s turn to play</h2>;
    }
  }

  displayRow = (colors: Color[], key: number) => {
    return (
      <Row
        row={key}
        dropCoin={this.dropCoin}
        colors={colors}
        key={`column-${key}`}
        winner={this.props.winner}
      />
    );
  };

  displayFooterAction = () => {
    const { winner, resetGame } = this.props;

    return (
      <div
        data-test-id="reset-button"
        onClick={resetGame}
        className={cn("footer-button", { "footer-button-green": winner })}
      >
        {winner ? "Play again" : "Start over"}
      </div>
    );
  };

  render() {
    const { yellow, red } = this.state;

    const classes = cn("Game-Board");

    return (
      <>
        {this.displayHeader()}

        <div className="Game">
          <div className={classes}>{this.props.board.map(this.displayRow)}</div>
        </div>
        <div className="Footer">
          {this.displayFooterAction()}
          <ScoreBoard yellowScore={yellow} redScore={red} />
        </div>
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  board: getBoard(state),
  color: getCurrentPlayer(state),
  winner: getWinner(state)
});

export const Board = connect(mapState, { dropCoin, resetGame })(BoardComponent);
