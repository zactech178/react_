import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
 
const SwalAlert = withReactContent(Swal)
const SweetAlert = (title, text,  footer, onConfirm) => {
    SwalAlert.fire({
        title: title,
        text: text,
        footer: footer,
        onOpen: () => {
          // `MySwal` is a subclass of `Swal`
          //   with all the same instance & static methods
          SwalAlert.clickConfirm()
        }
      }).then(() => {
        return SwalAlert.fire(<p>Shorthand works too</p>)
      })
}
export  {SweetAlert}