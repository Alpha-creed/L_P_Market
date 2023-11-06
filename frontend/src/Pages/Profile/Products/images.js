import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function Images({
    selectedProduct,
    setShowProductForm,
    getData,
}) {
    const [images=[],setImages]=useState(selectedProduct.images)
    const [file=null,setFile]=useState(null)
    const [showPreview=false,setShowPreview] = useState(true)
    const dispatch=useDispatch();
  return (
    <div>
      Images
    </div>
  )
}

export default Images
