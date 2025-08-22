import { ImageResponse } from 'next/og';

async function loadGoogleFont(weight: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&display=swap&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') ?? 'React Native Reusables';
  const description = url.searchParams.get('description') ?? 'Bringing shadcn/ui to React Native';

  return new ImageResponse(
    (
      <div tw="w-full h-full bg-white flex flex-col">
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white ">
          {/*  */}
          <div tw="absolute left-20 h-full w-px bg-[#E4E4E7]" />
          <div tw="absolute right-20 h-full w-px bg-[#E4E4E7]" />
          <div tw="absolute top-[61px] h-px w-full bg-[#E4E4E7]" />
          <div tw="absolute bottom-[61px] h-px w-full bg-[#E4E4E7]" />
          {/*  */}
          <div tw="absolute left-[79px] top-[38px] h-12 w-[3px] bg-[#B7B7C4]"></div>
          <div tw="absolute top-[60px] left-14 h-[3px] w-12 bg-[#B7B7C4]"></div>
          <div tw="absolute right-[79px] bottom-[38px] h-12 w-[3px] bg-[#B7B7C4]"></div>
          <div tw="absolute bottom-[60px] right-14 h-[3px] w-12 bg-[#B7B7C4]"></div>

          <div tw="flex-1 flex items-center justify-center p-12 overflow-hidden">
            <img
              src="https://exqr2q84pq.ufs.sh/f/r8NDF0EyEd5ox95GIV1BVwTqQuzWyE0Sj7IHZOJ9vs6tkc1G"
              height={504}
              width={1040}
              style={{
                opacity: 0.5,
                filter: 'contrast(10%)',
                objectFit: 'cover',
              }}
            />
            <span tw="absolute bottom-24 left-0 right-0 flex items-center justify-center">
              <svg
                width="44"
                height="39"
                viewBox="0 0 100 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M61.3902 44.3533L50.0005 55.6349M59.1123 31.9434L37.4717 53.3786M50.0005 65.869C76.5099 65.869 98 56.302 98 44.5002C98 32.6983 76.5099 23.1313 50.0005 23.1313C23.491 23.1313 2 32.6983 2 44.5002C2 56.302 23.491 65.869 50.0005 65.869ZM31.294 55.1846C44.5492 77.897 63.6687 91.525 73.9998 85.6245C84.3317 79.7231 81.9612 56.5273 68.706 33.8158C55.4517 11.1025 36.3313 -2.52551 26.0011 3.37585C15.6692 9.27632 18.0398 32.4722 31.294 55.1846ZM31.294 33.8158C18.0398 56.5282 15.6701 79.7231 26.0002 85.6245C36.3322 91.525 55.4517 77.8961 68.706 55.1846C81.9611 32.4713 84.3317 9.27721 74.0007 3.37585C63.6687 -2.52551 44.5492 11.1034 31.294 33.8158Z"
                  stroke="#0A0A0A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span tw="absolute block top-12 right-12 left-12 bottom-12 flex flex-col items-center justify-center">
              <h1
                tw="text-7xl tracking-tight text-center mt-5 mb-0.5"
                style={{
                  textWrap: title?.split(' ').length > 1 ? 'balance' : 'initial',
                }}>
                {title}
              </h1>
              <p tw="text-2xl text-center max-w-[800px] text-neutral-600 pb-2">{description}</p>
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont('700', title ?? ''),
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Geist',
          data: await loadGoogleFont('500', description ?? ''),
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}
