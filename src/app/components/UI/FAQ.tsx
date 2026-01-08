import React from 'react'
import Accordion from './Accordion'
import { FAQItem } from '@/app/types/FAQ';


type FAQProps = {
  list: FAQItem[];
};

export default function FAQ({ list }: FAQProps) {
  return (
    <div className='mx-6'>
        {list.map((item, index) => (
            
            <Accordion key={index} title={item.title} paragraph={item.paragraph}/>
        ))}
    </div>
  )
}
