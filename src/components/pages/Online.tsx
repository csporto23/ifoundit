import * as React from 'react';
import '../../stylesheets/Multiplayer.css';
import 'normalize.css';
import 'antd/dist/antd.css';
import SocketIo from '../../socket.io.client';
import RoomDetailsAi from '@Multiplayer/components/RoomDetails/RoomDetailsAi';

interface AppProps {
}

interface AppState {
  isReset: boolean;
  fen: string;
  orientation: 'b' | 'w';
  roomId: string;
  roomUsers: string[];
  currentUser: string;
  messagesArray: any[];
  gameType: 'ai';
  gameStatus: {
    message: string,
    type: 'success' | 'info' | 'warning' | 'error',
    showIcon: boolean
  };
}

class Online extends React.Component<AppProps, AppState> {
  public constructor(props: any, context: object) {
    super(props, context);
    this.state = {
      isReset: false,
      fen: '',
      orientation: 'w',
      gameType: 'ai',
      roomId: '',
      roomUsers: [],
      currentUser: '',
      messagesArray: [],
      gameStatus: {
        message: 'Welcome to React Chess. Please press Start New Game to begin.',
        type: 'info',
        showIcon: false
      }
    };
    SocketIo.on('board-update', this.updateBoardListener);
    SocketIo.on('user-channel', this.newUserListener);
    SocketIo.on('message', this.newMessageListener);
  }

  public render() {
    return (
      <div className="app">
        <RoomDetailsAi
          onGameTypeSelected={this.onGameTypeSelected}
          setOrientation={this.setOrientation}
          resetGame={this.resetGame}
          gameType={this.state.gameType}
          isReset={this.state.isReset}
          fen={this.state.fen}
          afterUpdateCallback={this.afterUpdateCallback}
          onMoveCallback={this.onMoveCallback}
          gameStatus={this.state.gameStatus}
          orientation={this.state.orientation}
          roomUsers={this.state.roomUsers}
          sendMessage={this.sendMessage}
          messagesArray={this.state.messagesArray}
        />
      </div>
    );
  }

  private resetGame = () => {
    this.setState({
      isReset: true
    }, () => {
      this.setState({ isReset: false });
      SocketIo.emit(
        'board-update',
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        this.state.gameType === 'ai' ? true : false, true,
        this.state.orientation
      );
    });
  }

  private updateGameStatus = (chessObj) => {
    if (this.state.fen === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      return;
    }
    let message = 'normal';
    let type: 'success' | 'info' | 'warning' | 'error' = 'info';
    let showIcon = false;
    if (chessObj.turn() === this.state.orientation) {
      message = 'Your turn';
      type = 'success';
      if (chessObj.in_check() && (!chessObj.in_checkmate() || chessObj.moves().length !== 0)) {
        message = 'You are being checked!';
        type = 'warning';
        showIcon = true;
      } else if (chessObj.in_checkmate() || chessObj.moves().length === 0) {
        message = 'You\'ve lost!';
        type = 'error';
        showIcon = true;
      }
    } else {
      if (chessObj.in_checkmate() || chessObj.moves().length === 0) {
        message = 'Congratulations! You\'ve won!';
        type = 'success';
        showIcon = true;
      } else {
        message = 'Not Your turn';
        type = 'warning';
      }
    }
    this.setState({
      gameStatus: {
        message,
        type,
        showIcon,
      }
    });
  }

  private onMoveCallback = (chessObj) => {
    SocketIo.emit(
      'board-update',
      chessObj.fen(),
      this.state.gameType === 'ai' ? true : false, false,
      this.state.orientation,
    );
    this.updateGameStatus(chessObj);
  }

  private afterUpdateCallback = (chessObj) => {
    this.updateGameStatus(chessObj);
  }

  private updateBoardListener = (fen) => {
    this.setState({ fen });
  }

  private setOrientation = (side: 'b' | 'w') => {
    this.setState({
      orientation: side
    });
  }

  private sendMessage = (message: string) => {
    if (message === '') {
      return;
    }
    SocketIo.emit('message', {
      userName: this.state.currentUser,
      message
    });
  }

  private newUserListener = (newUserObj) => {
    this.setState({
      roomId: newUserObj.roomId,
      roomUsers: newUserObj.roomUsers
    });
  }

  private newMessageListener = (messageObj) => {
    if (messageObj.userName === this.state.currentUser) {
      messageObj.from = 'self';
    }
    this.setState({
      messagesArray: [...this.state.messagesArray, messageObj]
    });
  }

  private onGameTypeSelected = (e) => {
    this.setState({
      gameType: e.target.value
    });
  }
}

export default Online;
