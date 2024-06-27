import Image from "next/image";
import Link from "next/link";

export default function Aside() {
  return (
    <div className="lg:col-span-1 lg:w-full lg:h-full">
      <div className="sticky top-0 start-0 py-8 lg:ps-8">
        <Link
          href={"/hakkimda"}
          className="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8"
        >
          <div className="block flex-shrink-0">
            <Image
              alt="Profile"
              src={"https://dummyimage.com/100x100"}
              className="object-cover object-center h-full w-full rounded-full"
              width={100}
              height={100}
              priority
            />
          </div>

          <div className="group grow block">
            <h5 className="group-hover:text-gray-600 text-sm font-semibold text-gray-800">
              {"Bilgehan Kocabıyık"}
            </h5>
            <p className="text-sm text-gray-500">
              {"İzmir Katip Çelebi Üniversitesinde öğrenci"}
            </p>
          </div>
        </Link>

        <div className="space-y-6">
          <Link className="group flex items-center gap-x-6" href={"#"}>
            <div className="grow">
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600">
                {"5 Reasons to Not start a UX Designer Career in 2022/2023"}
              </span>
            </div>

            <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
              <Image
                width={100}
                height={100}
                className="size-full absolute top-0 start-0 object-cover rounded-lg"
                src={"https://dummyimage.com/100x100"}
                alt={"Image Description"}
              />
            </div>
          </Link>

          <Link className="group flex items-center gap-x-6" href={"#"}>
            <div className="grow">
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600">
                {
                  "If your UX Portfolio has this 20% Well Done, it Will Give You an 80% Result"
                }
              </span>
            </div>

            <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
              <Image
                width={100}
                height={100}
                className="size-full absolute top-0 start-0 object-cover rounded-lg"
                src={"https://dummyimage.com/100x100"}
                alt={"Image Description"}
              />
            </div>
          </Link>

          <Link className="group flex items-center gap-x-6" href={"#"}>
            <div className="grow">
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600">
                {"7 Principles of Icon Design"}
              </span>
            </div>

            <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
              <Image
                width={100}
                height={100}
                className="size-full absolute top-0 start-0 object-cover rounded-lg"
                src={"https://dummyimage.com/100x100"}
                alt={"Image Description"}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
