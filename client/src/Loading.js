import React, {useRef, useEffect}  from "react";
import { useGlobalState } from "./Context";

const Loading = () => {

    const {showLoading} = useGlobalState();
    const ddd = useRef(null);

    useEffect(() => {
        if(showLoading) {
            ddd.current.showModal();
        } else {
           
        }
        
    }, [showLoading])

    return (
        <>
        {showLoading ? <section>
            <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded"  ref={ddd}>
              <form method="dialog">
                <p>Loading...</p>
                
              </form>
            </dialog>
          </section> : null}
        </>
      )
}

export default Loading