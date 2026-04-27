import logo from "../../assets/images/devconnect-logo.svg";
// import styles from "./Header.module.scss";

export function Logo() {
  return (
    <div className="max-w-[150px] lg:max-w-[200px] shrink-0">
      <img className="w-full" src={logo} alt="DevConnect logotype" />
    </div>
  );
}
