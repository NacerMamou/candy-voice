const Voice = ({ name, id, language }) => {
  return (
    <div className="voice-container" id={id}>
      <div className="voice-name">{name}</div>
      <div className="voice-id">{id}</div>
      <div className="voice-language">{language}</div>
    </div>
  );
};

export default Voice;
