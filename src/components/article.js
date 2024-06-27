"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

export default function Article() {
  return (
    <div className="lg:col-span-2">
      <div className="py-8 lg:pe-8">
        <div className="space-y-5 lg:space-y-8">
          <Link
            className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline"
            href="/blog"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Blog'a dön
          </Link>

          <h1 className="text-3xl font-bold lg:text-5xl">
            {"Announcing a free plan for small teams"}
          </h1>

          <div className="flex items-center gap-x-5">
            <Link
              className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
              href={"#"}
            >
              {"Company News"}
            </Link>
            <p className="text-xs sm:text-sm text-gray-800">
              {"January 18, 2023"}
            </p>
          </div>

          {/*Aşağısı text editöründen gelecek  */}
          <>
            <p className="text-lg text-gray-800">
              At preline, our mission has always been focused on bringing
              openness and transparency to the design process. We've always
              believed that by providing a space where designers can share
              ongoing work not only empowers them to make better products, it
              also helps them grow.
            </p>

            <p className="text-lg text-gray-800">
              We're proud to be a part of creating a more open culture and to
              continue building a product that supports this vision.
            </p>

            <div className="text-center">
              <div className="grid lg:grid-cols-2 gap-3">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  <figure className="relative w-full h-60">
                    <Image
                      width={240}
                      height={200}
                      className="size-full absolute top-0 start-0 object-cover rounded-xl"
                      src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="Image Description"
                    />
                  </figure>
                  <figure className="relative w-full h-60">
                    <Image
                      width={240}
                      height={200}
                      className="size-full absolute top-0 start-0 object-cover rounded-xl"
                      src="https://images.unsplash.com/photo-1671726203638-83742a2721a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="Image Description"
                    />
                  </figure>
                </div>
                <figure className="relative w-full h-72 sm:h-96 lg:h-full">
                  <Image
                    width={240}
                    height={400}
                    className="size-full absolute top-0 start-0 object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1671726203394-491c8b574a0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                    alt="Image Description"
                  />
                </figure>
              </div>

              <span className="mt-3 block text-sm text-center text-gray-500">
                Working process
              </span>
            </div>

            <p className="text-lg text-gray-800">
              As we've grown, we've seen how Preline has helped companies such
              as Spotify, Microsoft, Airbnb, Facebook, and Intercom bring their
              designers closer together to create amazing things. We've also
              learned that when the culture of sharing is brought in earlier,
              the better teams adapt and communicate with one another.
            </p>

            <p className="text-lg text-gray-800">
              That's why we are excited to share that we now have a{" "}
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="#"
              >
                free version of Preline
              </Link>
              , which will allow individual designers, startups and other small
              teams a chance to create a culture of openness early on.
            </p>

            <blockquote className="text-center p-4 sm:px-7">
              <p className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal xl:text-2xl xl:leading-normal">
                To say that switching to Preline has been life-changing is an
                understatement. My business has tripled and I got my life back.
              </p>
              <p className="mt-5 text-gray-800">Nicole Grazioso</p>
            </blockquote>

            <figure>
              <Image
                width={240}
                height={200}
                className="w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1671726203454-488ab18f7eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Image Description"
              />
              <figcaption className="mt-3 text-sm text-center text-gray-500">
                A man and a woman looking at a cell phone.
              </figcaption>
            </figure>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Bringing the culture of sharing to everyone
              </h3>

              <p className="text-lg text-gray-800">
                We know the power of sharing is real, and we want to create an
                opportunity for everyone to try Preline and explore how
                transformative open communication can be. Now you can have a
                team of one or two designers and unlimited spectators (think
                PMs, management, marketing, etc.) share work and explore the
                design process earlier.
              </p>
            </div>

            <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800">
              <li className="ps-2">
                Preline allows us to collaborate in real time and is a really
                great way for leadership on the team to stay up-to-date with
                what everybody is working on,"{" "}
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  said
                </Link>{" "}
                Stewart Scott-Curran, Intercom's Director of Brand Design.
              </li>
              <li className="ps-2">
                Preline opened a new way of sharing. It's a persistent way for
                everyone to see and absorb each other's work," said David Scott,
                Creative Director at{" "}
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  Eventbrite
                </Link>
                .
              </li>
            </ul>

            <p className="text-lg text-gray-800">
              Small teams and individual designers need a space where they can
              watch the design process unfold, both for themselves and for the
              people they work with – no matter if it's a fellow designer,
              product manager, developer or client. Preline allows you to invite
              more people into the process, creating a central place for
              conversation around design. As those teams grow, transparency and
              collaboration becomes integrated in how they communicate and work
              together.
            </p>
          </>
          {/*Yukarısı text editöründen gelecek  */}

          <div className="grid lg:flex lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
            <div>
              <Link
                className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                href={"#"}
              >
                {"Plan"}
              </Link>
            </div>

            <div className="flex justify-end items-center gap-x-1.5">
              <div className="block h-3 border-e border-gray-300 mx-3"></div>

              <div className="hs-dropdown relative inline-flex">
                <div className="mx-1">
                  <FacebookShareButton
                    url={"https://github.com/next-share"}
                    quote={
                      "next-share is a social share buttons for your next React apps."
                    }
                    hashtag={"#next.js"}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
                <div className="mx-1">
                  <TwitterShareButton
                    url={"https://github.com/next-share"}
                    title={
                      "next-share is a social share buttons for your next React apps."
                    }
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
                <div className="mx-1">
                  <WhatsappShareButton
                    url={"https://github.com/next-share"}
                    title={
                      "next-share is a social share buttons for your next React apps."
                    }
                    separator=":: "
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
                <div className="mx-1">
                  <LinkedinShareButton url={"https://github.com/next-share"}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
