interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export function ToggleButton({ ...props }: Props) {
  return <input type="checkbox" {...props} />;
}
