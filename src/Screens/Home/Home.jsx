import React, { useEffect } from 'react'
import {useState} from 'react'
import { getAllProducts, cleanUp, orderByPrice,
  orderByRate, getCategories, filterByCategory} from '../../Actions/products';
import Card from '../../Components/Card/Card';
import { useDispatch,useSelector } from "react-redux";
import styles from './Home.module.css'
import icon from '../../Assets/cart.svg'
import Paging from '../../Components/Paging/Paging';
import SearchBar from '../../Components/SearchBar/SearchBar';
//import{FormGroup, Label} from "react-bootstrap"
import ShoppingBtn from '../../Components/Shopping/ShoppingBtn';
import CategoriasForm from '../../Components/Checkbox/CategoriasForm';



export default function Home() {
  
  const dispatch = useDispatch()

React.useEffect(()=>{
  dispatch(getAllProducts())
  return () => {
    dispatch(cleanUp())
  };
  },[])
  useEffect(()=>{
    dispatch(getCategories())
  }, [dispatch])



  
  
  const allProducts = useSelector((state) => state.productsReducer.products)
  console.log(allProducts)
  const categories= useSelector((state)=>state.productsReducer.categories)
  console.log(categories)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsOnPage, setProductsOnPage] = useState(12)
  const indexLastProduct = currentPage * productsOnPage
  const indexFirstProduct = indexLastProduct - productsOnPage
  const currentProducts = allProducts.slice(indexFirstProduct, indexLastProduct)


const paginado = (pageNum) => {
  setCurrentPage(pageNum)
}


  

///////////////
function handleClick(e) {
  //resetea para que traiga todos los produtos de nuevo cuando se buggea
  e.preventDefault();
  getAllProducts();
}



function handleOrderByPrice(e) {
  e.preventDefault();
  dispatch(orderByPrice(e.target.value));
}


  return (
    <div className={styles.container}>
    
      <div className={styles.order}>

        {/* PAGINADO */}
        <div className={styles.pagination}>
            <Paging
              productsOnPage={productsOnPage}
              allProducts={allProducts.length}
              paginado={paginado} />
          </div>


          {/* SORT BTN */}
          <div className={styles.sort}>

               <div className={styles.filtroPrecio} >
                <select className={styles.selectors} onChange={handleOrderByPrice}>
                  <option value="cero">Ordenar</option>
                  <option value="asc">Menor precio</option>
                  <option value="desc">Mayor precio</option>
                </select>
              </div> 

          </div>

          
          {/* SEARCHBAR */}
          <div className={styles.search}>
              <form >
                <SearchBar />
              </form>
          </div>
        
      </div>
      

    
               


          {/* Filtros */}
          <div className={styles.filters}>
              <CategoriasForm />
          </div>
          
          



          {/* GRILLA PRODUCTOS */}
          <div className={styles.grilla}>
              <div className={styles.grillaCards}>
                  {
                      currentProducts?.map(e => <Card key={e.id} id={e.id} img={e.images[0]} title={e.title} category={e.category} price={e.price} />
                  )} 
              </div>
            

          </div>


        </div>
      
   
  )
  
}
