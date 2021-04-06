import React from 'react'
import Carousel from 'components/carousel'
import LoadingDots from 'components/loadingDots'
import CarouselItem from 'components/carousel/carouselItem'
import useGifs from 'hooks/useGifs'
import SectionTitle, {ViewMoreLink} from 'components/sectionTitle'

export default function KeywordCarousel({keyword="Banana",numElements = 15,carouselHeight = 140, titleIcon}){

    const {isLoading,gifs} = useGifs({keyword,rating:'g',limit:numElements})

    return <>
        {   isLoading? <LoadingDots/> :
            <section className="trendings-carousel">
                
                <SectionTitle title={`${keyword} GIFs`} svg={titleIcon} viewMore={<ViewMoreLink message={"All the GIFs"} path={`/search/${keyword}`}/>}/>
                <Carousel height={carouselHeight}>
                    { 
                        gifs.map(({id,title,url},index) => <CarouselItem key={id} url={url} title={title} height={carouselHeight}/>) 
                    }
                </Carousel>
            </section>
        } 
    </>
}