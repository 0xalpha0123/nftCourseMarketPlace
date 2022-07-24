
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { useWalletInfo } from "@components/hooks/web3"
import { Button } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@components/ui/marketplace"
import { useWeb3 } from "@components/providers"

export default function Marketplace({courses}) {

  const { web3 , contract } = useWeb3();
  const { canPurchaseCourse , account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null); 

  const purchaseCourse = async order => {

    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      { type : "bytes16", value : hexCourseId },
      { type : "address", value : account.data }
    );
    const emailHash = web3.utils.sha3(order.email);
    const proof = web3.utils.soliditySha3(
      { type : "bytes32", value : emailHash },
      { type : "bytes32", value : orderHash }
    );

    const value = web3.utils.toWei(String(order.price));

    try {
      await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({ from : account.data , value})
    } catch (error) {
      console.log("Purchase course : Operation has failed.",error);
    }

    //emailHash + courseHash

  };

  return (
    <>
            <MarketHeader/>
            <CourseList courses={courses}>
                { course => 
                  <CourseCard 
                    disabled={!canPurchaseCourse}
                    key={course.id} 
                    course={course}
                    Footer={() => 
                    <div className="mt-4">
                      <Button onClick={() => setSelectedCourse(course)} disabled={!canPurchaseCourse} variant="lightPurple">
                        Purchase
                      </Button>
                    </div>
                    }
                  /> }
            </CourseList>
            {
              selectedCourse &&   
              <OrderModal 
                onSubmit={purchaseCourse}
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
              />
            }
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

Marketplace.Layout = BaseLayout;