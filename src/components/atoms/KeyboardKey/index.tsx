export const KeyboardKey = (props: { children: string }) => {
  return (
    <span
      style={{
        borderRadius: "0.25rem",
        background: "rgba(0,0,0,0.2)",
        padding: "2px 6px",
        fontFamily: "monospace",
        borderBottom: "solid 1px black",
      }}
    >
      {props.children}
    </span>
  );
};
