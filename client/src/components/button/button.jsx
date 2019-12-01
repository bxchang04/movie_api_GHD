import './button.scss';

class Button extends React.Component {
    render() {
        return <button>{this.props.label}</button>;
    }
}

function Button({ label }) {
    return (
        <button>{label}</button>);
}