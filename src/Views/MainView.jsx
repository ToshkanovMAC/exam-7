import HeroBlock from '../Layout/HeroBlock'
import BannerBlock from '../Layout/BannerBlock'
import PopularBlock from '../Layout/PopularBlock'
import DailyBlock from '../Layout/DailyBlock'
import DealsBlock from '../Layout/DealsBlock'
import TopListsBlock from '../Layout/TopListsBlock'
import NewsletterBlock from '../Layout/NewsletterBlock'
import FeaturesBlock from '../Layout/FeaturesBlock'

export default function MainView() {
  return (
    <>
      <HeroBlock />
      <BannerBlock />
      <PopularBlock />
      <DailyBlock />
      <DealsBlock />
      <TopListsBlock />
      <NewsletterBlock />
      <FeaturesBlock />
    </>
  )
}
