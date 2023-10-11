import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import * as ROUTES from '../../constants/routes';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
 
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: '/account',
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link: '/account-edit',
  },
  {
    label: "Setting",
    icon: LifebuoyIcon,
    link: '/settings',
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    link: '/logout',
  },
];

const nonAuthMenuItems = [
  {
    label: "Sign in",
    icon: ArrowRightOnRectangleIcon,
    link: '/login',
  },
  {
    label: "Register",
    icon: PencilSquareIcon,
    link: '/sign-up',
  }
]
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} 
      handler={setIsMenuOpen} 
      placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(UserCircleIcon, { className: "h-[18px] w-[18px]" })}{" "}
            {"Account"}
          </MenuItem>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}


function NonAuthMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(UserCircleIcon, { className: "h-[18px] w-[18px]" })}{" "}
            {"Account"}
          </MenuItem>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {nonAuthMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === nonAuthMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 

function HistoryItem(){
  return(
    <Typography
          key={"FOODS"}
          as="a"
          href={ROUTES.MY_FOOD_HISTORY}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(ShoppingBagIcon, { className: "h-[18px] w-[18px]" })}{" "}
            {"FOODS"}
          </MenuItem>
        </Typography>
  )
}
 
const NavbarAuth = ({authUser}) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-2xl p-2 lg:rounded-full lg:pl-6 text-black">
      <div className="relative mx-auto flex items-center">
        <Typography
          as="a"
          href={ROUTES.LANDING}
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Food Sharing
        </Typography>
        <HistoryItem />
        <ProfileMenu />
      </div>
    </Navbar>
  );
}

const NavbarNonAuth = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-2xl p-2 lg:rounded-full lg:pl-6 text-black">
      <div className="relative mx-auto flex items-center">
        <Typography
          as="a"
          href={ROUTES.LANDING}
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Food Sharing
        </Typography>
        <NonAuthMenu />
      </div>
    </Navbar>
  );
}

const MyNavbar = props => (
  <div>
    {props.authUser ? (
    <NavbarAuth authUser={props.authUser} />
  ) : (
    <NavbarNonAuth />
  )}
  </div>

);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

// sign in/ sign up https://www.material-tailwind.com/docs/react/navbar#
export default connect(mapStateToProps)(MyNavbar);