'use client';
import { ROUTES, STORAGE } from '@/constants';
import { useAuthContext } from '@/context';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
} from '@nextui-org/react';
import { LogOut, SearchIcon, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

const Topbar = () => {
  const { user: userInfo, setUser } = useAuthContext();
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem(STORAGE.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE.REFRESH_TOKEN);
    setUser(null);
    location.href = ROUTES.AUTH.LOGIN;
  };

  return (
    <div className="flex h-20 items-center gap-4 border-b-1 border-l-1 bg-background p-4">
      <Input
        variant="bordered"
        className="flex-1 cursor-pointer"
        placeholder="Search..."
        endContent={<SearchIcon onClick={() => console.log(1)} />}
      />
      <ThemeSwitcher />
      <Dropdown>
        <DropdownTrigger>
          <button className="grid size-10 place-items-center rounded-full bg-primary-50 p-1">
            {userInfo?.avatar ? (
              <Image
                src={userInfo.avatar}
                alt={userInfo.firstname}
                width={40}
                height={40}
                className="w-full rounded-full object-cover"
              />
            ) : (
              <User2 size={20} />
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          topContent={
            <p className="p-2 font-semibold">
              {userInfo?.firstname || 'N/A'} - {userInfo?.role}
            </p>
          }>
          <DropdownItem key="new" endContent={<User2 size={14} />}>
            <Link to={ROUTES.PROFILE} className="w-full block">
              Profile
            </Link>
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            endContent={<LogOut size={14} />}
            onClick={onClickLogout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Topbar;
