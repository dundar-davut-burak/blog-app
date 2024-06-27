import Image from "next/image";
import Link from "next/link";

export default function LatestPosts() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        <h2 className="title-font sm:text-4xl text-3xl mb-10 font-medium text-gray-900">
          En son yayınlanan gönderiler
        </h2>
        <div className="flex flex-wrap -mx-4 -my-8">
          <div className="py-8 px-4 lg:w-1/3">
            <div className="h-full flex items-start">
              <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                  Jul
                </span>
                <span className="font-medium text-lg text-gray-800 title-font leading-none">
                  18
                </span>
              </div>
              <div className="flex-grow pl-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                  CATEGORY
                </h2>
                <Link href={"/blog/1"}>
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    Neptune
                  </h1>
                </Link>
                <p className="leading-relaxed mb-5">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
                <Link href={"/hakkimda"} className="inline-flex items-center">
                  <Image
                    alt="blog"
                    src="https://dummyimage.com/101x101"
                    className="w-8 h-8 rounded flex-shrink-0 object-cover object-center"
                    width={50}
                    height={50}
                    priority
                  />
                  <span className="flex-grow flex flex-col pl-3">
                    <span className="title-font font-medium text-gray-900">
                      Bilgehan Kocabıyık
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="py-8 px-4 lg:w-1/3">
            <div className="h-full flex items-start">
              <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                  Jul
                </span>
                <span className="font-medium text-lg text-gray-800 title-font leading-none">
                  18
                </span>
              </div>
              <div className="flex-grow pl-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                  CATEGORY
                </h2>
                <Link href={"/blog/2"}>
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    Neptune
                  </h1>
                </Link>
                <p className="leading-relaxed mb-5">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
                <Link href={"/hakkimda"} className="inline-flex items-center">
                  <Image
                    alt="blog"
                    src="https://dummyimage.com/101x101"
                    className="w-8 h-8 rounded flex-shrink-0 object-cover object-center"
                    width={50}
                    height={50}
                    priority
                  />
                  <span className="flex-grow flex flex-col pl-3">
                    <span className="title-font font-medium text-gray-900">
                      Bilgehan Kocabıyık
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="py-8 px-4 lg:w-1/3">
            <div className="h-full flex items-start">
              <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                  Jul
                </span>
                <span className="font-medium text-lg text-gray-800 title-font leading-none">
                  18
                </span>
              </div>
              <div className="flex-grow pl-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                  CATEGORY
                </h2>
                <Link href={"/blog/3"}>
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    Neptune
                  </h1>
                </Link>
                <p className="leading-relaxed mb-5">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
                <Link href={"/hakkimda"} className="inline-flex items-center">
                  <Image
                    alt="blog"
                    src="https://dummyimage.com/101x101"
                    className="w-8 h-8 rounded flex-shrink-0 object-cover object-center"
                    width={50}
                    height={50}
                    priority
                  />
                  <span className="flex-grow flex flex-col pl-3">
                    <span className="title-font font-medium text-gray-900">
                      Bilgehan Kocabıyık
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
