export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  // Render a button showing the die value
  return (
  <button style={styles}>
    {props.value}
    </button>);
}
