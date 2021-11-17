import './MuteUnmuteComponent.css';
import { Component } from 'react';
import MuteIcon from '../../assets/icons/Mute.png';
import UnmuteIcon from '../../assets/icons/Unmute.png';
import { playerService} from '../../Service/PlayerService';

class Mute extends Component {
    constructor() {
        super()
        this.state = {
            isMute: null
        }

        this.observer = e => {
            switch (e.action) {
                case 'SET_VIDEOLIST':
                    this.setState({ isMute: playerService.getVolumeStates('isMute') })
                    break;

                case 'MUTE':
                    this.setState({ isMute: true });
                    break;

                case 'UNMUTE':
                    this.setState({ isMute: false });
                    break;

                default:
                    break;
            }
        };

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        playerService.actionSubject.subscribe(this.observer);
    }

    componentWillUnmount() {
        playerService.actionSubject.unsubscribe(this.observer);
    }

    onClickMuteUnmute() {
        playerService.muteUnmuteVideo()
    }

    render() {
        return (
            <button
                id="mute-unmute"
                onClick={this.onClickMuteUnmute}>
                <img
                    className="mute-unmute"
                    src={
                        this.state.isMute
                            ? MuteIcon
                            : UnmuteIcon}
                    alt="mute unmute" />
            </button>
        );
    }
}

export default Mute;