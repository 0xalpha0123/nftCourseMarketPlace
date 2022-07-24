import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";
import { useRouter } from "next/router";

export default function OwnedCourses({courses}) {
    const router = useRouter();
    const { account } = useAccount();
    const { ownedCourses } = useOwnedCourses(courses , account.data);
    return (
        <>
            <MarketHeader />
            <section className="grid grdi-cols-1">
                {ownedCourses.data && ownedCourses.data.length > 0  && ownedCourses.data.map((course) =>{
                    return (
                        <OwnedCourseCard key={course?.id} course={course}>
                            {/* <Message>
                                My Custom Message
                            </Message> */}
                            <Button
                                onClick={() => router.push(`/courses/${course.slug}`)}
                            >
                                Watch the Course
                            </Button>
                        </OwnedCourseCard>
                    )
                })}
            </section>
        </>
    )
}

export function getStaticProps() {
    const { data } = getAllCourses();
    return {
      props : {
        courses : data
      }
    }
  }

OwnedCourses.Layout = BaseLayout;