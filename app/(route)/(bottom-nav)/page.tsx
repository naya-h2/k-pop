import ArtistList from "@/(route)/_components/artist-list/ArtistList";
import MetaTag from "@/components/MetaTag";
import DottedLayout from "@/components/layout/DottedLayout";
import Logo from "@/public/icon/logo.svg";
import ArtistOfMonth from "../_components/ArtistOfMonth";
import Footer from "../_components/Footer";
import FavArtistEventsCarousel from "../_components/carousel/FavArtistEventsCarousel";
import NewestEventsCarousel from "../_components/carousel/NewestEventsCarousel";
import PopularEventsCarousel from "../_components/carousel/PopularEventsCarousel";

const Home = () => {
  return (
    <>
      <MetaTag />
      <DottedLayout size="wide">
        <header className="sticky left-0 top-0 z-nav h-68 w-full bg-white-black px-20 pb-16 pt-24 pc:hidden">
          <Logo />
        </header>
        <div className="flex flex-col gap-40 pb-72 pc:items-center pc:pb-0 pc:pt-52">
          <main className="flex flex-col gap-40 overflow-hidden pc:w-[112rem]">
            <ArtistOfMonth />
            <PopularEventsCarousel />
            <NewestEventsCarousel />
            {/* <ArtistList /> */}
          </main>
        </div>
        <Footer />
      </DottedLayout>
    </>
  );
};
export default Home;
