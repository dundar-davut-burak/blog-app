import Link from "next/link";

export default function SimilarPosts() {
  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="-my-8 divide-y-2 divide-gray-100">
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700">
                <font>{"KATEGORİ"}</font>
              </span>
              <span class="mt-1 text-gray-500 text-sm">
                <font>{"12 Haziran 2019"}</font>
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                <font>{"Acı hashtag yelek moda balta chia tek boynuzlu at"}</font>
              </h2>
              <p class="leading-relaxed">
                <font>
                  Daha parlak yankı park boksörü, kilise anahtarı terzilik
                  biyodizel vexillologist pop-up atıştırmalık dalgası rampaları
                  mısır deliği. Marfa 3 kurt ay partisi askılı çanta
                  özçekimleri, vaporware kombucha lumberseksüel domuz göbeği
                  polaroid kapüşonlu portland zanaat birasını dürtükleyin.
                </font>
              </p>
              <Link href={"/blog/5 "} class="text-indigo-500 inline-flex items-center mt-4">
                <font>Daha fazla bilgi edin</font>
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700">
                <font>{"KATEGORİ"}</font>
              </span>
              <span class="mt-1 text-gray-500 text-sm">
                <font>{"12 Haziran 2019"}</font>
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                <font>{"Acı hashtag yelek moda balta chia tek boynuzlu at"}</font>
              </h2>
              <p class="leading-relaxed">
                <font>
                  Daha parlak yankı park boksörü, kilise anahtarı terzilik
                  biyodizel vexillologist pop-up atıştırmalık dalgası rampaları
                  mısır deliği. Marfa 3 kurt ay partisi askılı çanta
                  özçekimleri, vaporware kombucha lumberseksüel domuz göbeği
                  polaroid kapüşonlu portland zanaat birasını dürtükleyin.
                </font>
              </p>
              <Link href={"/blog/5 "} class="text-indigo-500 inline-flex items-center mt-4">
                <font>Daha fazla bilgi edin</font>
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
