// Background color options, defaults to gray
const bgColor: Record<'black' | 'gray' | 'red', string> = {
  black: 'bg-[var(--bg-color)]',
  gray: 'bg-gray-500',
  red: 'bg-red-500'
};

// Column span options, defaults to 1
const colSpan: Record<0 | 1 | 2, string> = {
  0: 'w-8 h-8',
  1: 'col-span-1 w-16 h-16',
  2: 'col-span-2 w-32 h-16'
};

type ButtonProps = {
  label: string;
  color?: keyof typeof bgColor;
  onClick: () => void;
  cols?: keyof typeof colSpan;
};

export default function Button({ label, color='gray', onClick, cols=1 }: ButtonProps ) {

  const bg = bgColor[color]
  const col = colSpan[cols]

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 100);
    onClick();
  };

  return (
    <button data-label={label} className={`${bg} ${col} rounded-full text-[var(--fg-color)] font-bold`} onClick={handleClick}>{label}</button>
  )
}