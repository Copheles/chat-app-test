interface Props {
  displayName: string;
}

const Avatar = ({ displayName }: Props) => {
  const firstLetter = displayName[0];

  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-500 text-white">
      {firstLetter}
    </div>
  );
};

export default Avatar;
