import React from 'react'
import { styled } from 'styled-components'


const categories = [
    {
        name:'Hp',
        value:'hp',
    },
    {
        name:"Lenovo",
        value:"lenovo",
    },{
        name:"Acer",
        value:"acer",
    },
    {
        name:"Samsung",
        value:"samsung",
    },
    {
        name:"Tecno",
        value:"tecno",
    },
    {
        name:"Iphone",
        value:"iphone",
    },
]
const ages=[
    {
        name:"0-2 years old",
        value:"0-2",
    },
    {
        name:"3-5 years old",
        value:"3-5",
    },
    {
        name:"6-8 years old",
        value:"6-8",
    },
    {
        name:"9-12 years old",
        value:"9-12",
    },
    {
        name:"13+ years old",
        value:"12-20",
    }
]
function Filters({showFilters,setShowFilters,filters,setFilters}) {
    const FiltersOverlay = styled.div`
        width:300px;
        display:flex;
        flex-direction:column; 
        margin-left:20px;  
    `
    const FiltDiv = styled.div`
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:20px 0;
    `
    const FiltHeader = styled.h3`
        color:#470101;
    `
    const FiltIcon = styled.i`
        font-size:30px;
    `
    const CatDiv = styled.div`
        display:flex;
        flex-direction:column;
        gap:4px;
        margin:5px 0;
    `
    const CatHeader = styled.h4`
        color:#696969;
    `
    const CatOverlay = styled.div`
        display:flex;
        flex-direction:column;
        gap:5px;
    `
    const CatDetails = styled.div`
        display:flex;
        align-items:center;
        gap:6px;
    `
    const AgeTitle = styled.h4`
        color:#696969;
        margin:10px 0;
    `
    const AgeOverlay = styled.div`
        display:flex;
        flex-direction:column;
        gap:10px;
    `
    const AgeDetails = styled.div`
        display:flex;
        align-items:center;
        gap:5px;
    `
  return (
    <FiltersOverlay>
      <FiltDiv>
        <FiltHeader>Filters</FiltHeader>
        <FiltIcon className="ri-door-open-line"
            onClick={()=>setShowFilters(!showFilters)}>  
        </FiltIcon>
      </FiltDiv>
        <CatDiv>
            <CatHeader>Categories</CatHeader>
            <CatOverlay>
                {categories.map((category)=>{
                    return(
                        <CatDetails>
                            <input
                                type="checkbox"
                                name="category"
                                className='max-width'
                                checked={filters.category.includes(category.value)}
                                onChange={(e)=>{
                                    if(e.target.checked){
                                        setFilters({
                                            ...filters,
                                            category:[...filters.category,category.value],
                                        })
                                    }else{
                                        setFilters({
                                            ...filters,
                                            category:filters.category.filter(
                                                (item=>item!== category.value)
                                            )
                                        })
                                    }
                                }}
                            />
                            <label htmlFor='category'>{category.name}</label>
                        </CatDetails>
                    )
                })}
            </CatOverlay>
            <AgeTitle>Ages</AgeTitle>
            <AgeOverlay>
                {
                    ages.map((age)=>{
                        return(
                            <AgeDetails>
                                <input
                                    type='checkbox'
                                    name="age"
                                    className='max-width'
                                    checked={filters.age.includes(age.value)}
                                    onChange={(e)=>{
                                        if(e.target.checked){
                                            setFilters({
                                                ...filters,
                                                age:[...filters.age,age.value],
                                            })
                                        }else{
                                            setFilters({
                                                ...filters,
                                                age:filters.age.filter((item)=>item !== age.value),
                                            })
                                        }
                                    }}
                                />
                                <label htmlFor='age'>{age.name}</label>
                            </AgeDetails>
                        )
                    })
                }
            </AgeOverlay>
        </CatDiv>
    </FiltersOverlay>
  )
}

export default Filters
