import * as React from 'react';
import ChessBoard from '@Multiplayer/components/Chess/Chessboard';
import ChessFooterAi from '@Multiplayer/components/ChessFooter/ChessFooterAi';
import '@Multiplayer/stylesheets/RoomDetailsAi.css';
import GameStatus from '@Multiplayer/components/GameStatus/GameStatus';

const RoomDetailsAi = (props) => {
  return (
      <div className="row">
        <div className="col">
      <h2 id="roomHeader"> {
          <GameStatus
            message={props.gameStatus.message}
            type={props.gameStatus.type}
            showIcon={props.gameStatus.showIcon}
          />
        }
      </h2>
      <div className="roomdetails-wrapper">
        <div>
          <ChessBoard
            isReset={props.isReset}
            fen={props.fen}
            onMoveCallback={props.onMoveCallback}
            afterUpdateCallback={props.afterUpdateCallback}
            orientation={props.orientation}
          />
          <ChessFooterAi
            onGameTypeSelected={props.onGameTypeSelected}
            setOrientation={props.setOrientation}
            resetGame={props.resetGame}
            gameType={props.gameType}
          />
        </div>
      </div>
      </div>
      </div>
  );
};

export default RoomDetailsAi;