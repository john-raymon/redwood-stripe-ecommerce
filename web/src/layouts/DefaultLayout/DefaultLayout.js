import Logo from './../../assets/svgs/logo.svg'
import { Button } from 'lite-react-ui'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <header className="w-full py-12 px-20">
        <div className="absolute left-0 right-0">
          <Logo className="mx-auto" />
        </div>
        <Button className="float-right !bg-[#FDD524] !text-[#2D4CEC] !uppercase !rounded-[1rem] !text-[1.1rem] !leading-[1.25rem] !py-[1.125rem]">
          cart (0)
        </Button>
      </header>
      <main>{children}</main>
    </>
  )
}

export default DefaultLayout
