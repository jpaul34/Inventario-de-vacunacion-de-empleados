import { HeaderComponent } from "../../components/header/header.component";
import "./main.layout.scss";

export const MainLayout = (props: any) => {
  return (
    <>
      <HeaderComponent/>

      <main className='main-layout'>
        {props.children}
      </main>
      
    </>
  )
}