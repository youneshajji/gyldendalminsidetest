import React from "react"
import { Image, Transformation, Placeholder } from "cloudinary-react"
import PropTypes from "prop-types"

/**
 * This will paint the hero image use for full article pages.
 * TODO: Image alt tags, credits og tittle skal hentes fra Cloudinary direkte. https://www.npmjs.com/package/cloudinary-core
 */
export const HeroImageRight = ({ url, altTag, title, subTitle, credits, caption }) => {
  return (
    <div>
      <figure>
        <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
          <Image
            cloudName={process.env.CLOUDINARY_CLOUD_NAME}
            publicId={url}
            alt={altTag}
            loading="lazy"
            className="rounded-lg shadow-lg object-cover object-center"
          >
            <Placeholder type="blur" />
            <Transformation effect="trim" crop="scale" width="1184" height="1376">
              {/* TODO: Provide overlay text to image here. Typically Heading 1 */}
              <Transformation overlay={"text:Arial_100:Hello" + title} />
            </Transformation>
          </Image>
        </div>
        {/* TODO Only add credit text if provided by props */}
        {credits !== "" && credits !== undefined ? (
          <figcaption className="mt-3 flex text-sm text-gray-500">
            <svg
              className="flex-none w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">{"Fotograf " + credits}</span>
          </figcaption>
        ) : (
            <div></div>
          )}
      </figure>
    </div>
  )
}

HeroImageRight.propTypes = {
  url: PropTypes.string.isRequired,
  altTag: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  credits: PropTypes.string,
  caption: PropTypes.string,
}

/**
 * This will paint the image needed by the hero card
 * @param url URL to image resource
 */
export const CardHeroImage = ({ url, altTag, title, subTitle, credits, caption }) => {
  return (
    <div>
      <figure>
        <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
          <Image
            cloudName={process.env.CLOUDINARY_CLOUD_NAME}
            publicId={url}
            alt={altTag}
            loading="lazy"
            className="h-48 w-full object-cover"
          >
            <Placeholder type="blur" />
            <Transformation effect="trim" crop="scale" width="353" height="200">
              {/* TODO: Provide overlay text to image here. Typically Heading 1 */}
              <Transformation overlay={"text:Arial_100:Hello" + title} />
            </Transformation>
          </Image>
        </div>
        {/* TODO Only add credit text if provided by props */}
        {credits !== "" && credits !== undefined ? (
          <figcaption className="mt-3 flex text-sm text-gray-500">
            <svg
              className="flex-none w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">{"Fotograf " + credits}</span>
          </figcaption>
        ) : (
            <div></div>
          )}
      </figure>
    </div>
  )
}

CardHeroImage.propTypes = {
  url: PropTypes.string.isRequired,
  altTag: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  credits: PropTypes.string,
  caption: PropTypes.string,
}
