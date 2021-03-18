import React, { useContext, useEffect } from "react"
import { BadgeLink } from "../Common/Badge"
import { UserContext, userInfo } from "../Security/UserContext"
import { CardHeroImage } from "../Content/ImageHandlers"

/**
 * @description: Tegner kort
 * @param props Innput
 */
const CommonCard = (props) => {
    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        setUser(userInfo())
    }, [])

    return (
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
                {props.data.heroImage !== undefined ? (
                    <CardHeroImage
                        url={props.data.heroImage[0].url}
                        credits=""
                        altTag={"Hovedbilde til " + props.data.title} // TODO: Hent alt tags fra Cloudinary med graphql spørring
                        title={props.data.title}
                    />
                ) : (
                        <div></div> // TODO add support for video
                    )}
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">{props.data.title}</p>
                    <p className="mt-3 text-base text-gray-500">
                        {props.data.ingress !== undefined && props.data.ingress !== null ? (
                            <div
                                className="body"
                                dangerouslySetInnerHTML={{
                                    __html: props.data.ingress.childMarkdownRemark.html,
                                }}
                            />
                        ) : (
                                <div></div>
                            )}
                    </p>
                    {props.data.public ? (
                        <BadgeLink url={`/${props.url}/${props.data.slug}/`} title="Les mer" />
                    ) : user.isLoggedInn ? (
                        <BadgeLink url={`/${props.url}/${props.data.slug}/`} title="Les mer" />
                    ) : props.data.public === undefined ? (
                        <BadgeLink url={`/${props.url}/${props.data.slug}/`} title="Les mer" />
                    ) : (
                                    <BadgeLink url="/minside/" title="Login for å lese" />
                                )}
                </div>
                <div className="mt-6 flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900"></p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime="2020-03-10">{props.data.createdAt}</time>
                            <span aria-hidden="true">&middot;</span>
                            <span> Antatt lesetid: {props.data.ingress.childMarkdownRemark.timeToRead} minutter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommonCard
