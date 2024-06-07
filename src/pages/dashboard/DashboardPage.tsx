import { Image } from '@nextui-org/react';

const DashboardPage = () => {
  return (
    <div className="size-full">
      <Image
        src="https://cdn.wallpapersafari.com/85/73/zgWiTx.jpg"
        alt="Dashboard"
        classNames={{
          img: 'size-full object-cover',
          wrapper: 'size-full',
        }}
      />
    </div>
  );
};

export default DashboardPage;
