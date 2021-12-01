import React from 'react'
import {List} from '../../components/index'

export const Home = props => {
    const { isFiltering,filtered,list,loadCategory,category,updateCart }=props
    
    return (

        <div className="container">
            <div className="row">
                <Sidemenu loadCategory={loadCategory} category={category} />
                <div className="col-sm">
                    <div className="row">
                        <List data={isFiltering ? filtered : list[category]}
                            category={category}  updateCart={updateCart} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export const Sidemenu = ({loadCategory, category}) => {
    const links = [ "Fruits", "Légumes", "Produit Frais", "Epicerie", "Boissons"]
    return (
      <div className="col-sm-2 sidebar">
        <ul className="ulpointer">
          {links.map((link,index) => {
            return (
              
              <li className={category === index ? 'active':null} key={index} onClick={()=>loadCategory(index)}>{link}</li>
            )
  
          })}
        </ul>
      </div>
    )
  }