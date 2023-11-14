import classNames from 'classnames';

interface ContentProps {
  children: React.ReactNode;
  done?: boolean;
}

export const Content: React.FC<ContentProps> = ({
  children,
  done,
}) => {
  return (
    <span
      className={classNames({
        '': true,
        'line-through': done,
      })}
    >
      {children}
    </span>
  );
};
