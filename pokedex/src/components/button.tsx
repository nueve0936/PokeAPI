import { Link } from 'react-router-dom';

interface Props {
  text: string;
  to?: string;       
  onClick?: () => void; 
  className?: string;   
}

export const Button = ({ text, to, onClick, className = "" }: Props) => {
  const styles = `bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors text-center ${className}`;

  if (to) {
    return <Link to={to} className={styles}>{text}</Link>;
  }

  return (
    <button onClick={onClick} className={styles}>
      {text}
    </button>
  );
};