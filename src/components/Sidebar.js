import React, { useContext } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { SideBarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SideBarContext);
  const { cart, clearCart, total,itemAmount } = useContext(CartContext);

  //
  const alertConfirmation = () => {
    // Generate a unique order number
    const orderNumber = `#${generateOrderNumber()}`;
  
    function generateOrderNumber() {
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const length = 5; // Adjust the length of the order number as needed
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    }
  
    Swal.fire({
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Enter Your Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Enter Your Email">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Enter Your Number">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Enter Your Address">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Card Number">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Expiry Date (MM/YY)">' +
        '<input id="swal-input7" class="swal2-input" placeholder="CVV">',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Validate the input fields
        const name = document.getElementById('swal-input1').value;
        const email = document.getElementById('swal-input2').value;
        const number = document.getElementById('swal-input3').value;
        const address = document.getElementById('swal-input4').value;
        const cardNumber = document.getElementById('swal-input5').value;
        const expiryDate = document.getElementById('swal-input6').value;
        const cvv = document.getElementById('swal-input7').value;
  
        if (
          name.trim() === '' ||
          email.trim() === '' ||
          number.trim() === '' ||
          address.trim() === '' ||
          cardNumber.trim() === '' ||
          expiryDate.trim() === '' ||
          cvv.trim() === ''
        ) {
          Swal.showValidationMessage('Please fill out all fields.');
        }
      },
    }).then((result) => {
      if (result.value) {
        clearCart(); // Call clearCart when confirming the order
        Swal.fire('Order Placed!', `Product ordered successfully. Your order number is ${orderNumber}.`, 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your Order has been cancelled.', 'error');
      }
    });
  };
  
  
  
  

  return (


  

    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>

        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={handleClose}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[400px] overflow-y-auto overflow-x-hidden border-b ">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>

      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>

          <div
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            onClick={clearCart}
          >
            <FiTrash2 />
          </div>
        </div>
        {/* <Link to='/' className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium">View cart</Link> */}
        <Link onClick={alertConfirmation} className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium">Checkout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
