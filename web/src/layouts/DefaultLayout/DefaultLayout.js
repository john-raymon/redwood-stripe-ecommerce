import Logo from './../../assets/svgs/logo.svg'
import { Button } from 'lite-react-ui'
import { useCartContext } from 'src/context/CartContext'
import { Link, routes } from '@redwoodjs/router'

const DefaultLayout = ({ children }) => {
  const { totalQuantity, checkout } = useCartContext()

  return (
    <>
      <header className="top-0 fixed w-full py-[3.125rem] px-3 md:px-20 flex items-center justify-end z-20">
        <div className="absolute top-0 w-full left-0 right-0 h-full flex items-center">
          <Link className="mx-auto w-[20%] md:w-[10rem]" to={routes.home()}>
            <Logo />
          </Link>
        </div>
        <Link to={routes.cart()}>
          <Button className="float-right !border-[transparent] !bg-[#FDD524] !text-[#2D4CEC] !uppercase !rounded-[1rem] !text-[1.1rem] !leading-[1.25rem] !py-[1.125rem]">
            cart ({totalQuantity})
          </Button>
        </Link>
      </header>
      <main className="mt-[10rem]">{children}</main>
    </>
  )
}

export default DefaultLayout
