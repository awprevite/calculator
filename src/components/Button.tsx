const bgColor: Record<string, string> = {
  black: 'bg-[var(--bg-color)]',
  gray: 'bg-gray-500',
  red: 'bg-red-500'
};
const colSpan: Record<string, string> = {
  1: 'col-span-1 w-16',
  2: 'col-span-2 w-32'
};

type ButtonProps = {
  label: string;
  color?: keyof typeof bgColor;
  onClick: () => void;
  cols?: number;
};

export default function Button({ label, color='normal', onClick, cols=1 }: ButtonProps ) {

  const bg = bgColor[color]
  const col = colSpan[cols]

  return (
    <button className={`${bg} ${col} h-16 rounded-full text-[var(--fg-color)] font-bold transition duration-100 ease-in-out active:scale-98`} onClick={onClick}>{label}</button>
  )
}