import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useSectorContext } from '../../../../../../context/SectorContext';

function Monitoring() {
  const { growthData } = useSelector((state) => state.bestfarmSlice);

  console.log(growthData);
  const { sector } = useSectorContext();
  return (
    <div>
      <span>Monitoring</span>
      {/* <SimpleLineChart /> */}
      <Outlet />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
        reiciendis perferendis a libero ipsum, porro possimus ullam saepe vel!
        Quos, nesciunt architecto. Nam ipsum, laboriosam amet veritatis
        dignissimos explicabo quasi vel. Odit et odio possimus, officia itaque
        est ipsa obcaecati laborum. Modi expedita optio, maxime animi eum
        beatae, ratione in ad aut debitis autem voluptatum officiis voluptatibus
        amet corporis consectetur sapiente, nihil libero. Pariatur doloremque,
        recusandae commodi totam reprehenderit libero quas fuga odit voluptas
        vero aliquid ducimus non distinctio ea repudiandae deleniti et earum
        dolore? Expedita adipisci molestiae obcaecati officiis accusamus
        dolorem, autem tempora iure maiores saepe cumque harum.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
        reiciendis perferendis a libero ipsum, porro possimus ullam saepe vel!
        Quos, nesciunt architecto. Nam ipsum, laboriosam amet veritatis
        dignissimos explicabo quasi vel. Odit et odio possimus, officia itaque
        est ipsa obcaecati laborum. Modi expedita optio, maxime animi eum
        beatae, ratione in ad aut debitis autem voluptatum officiis voluptatibus
        amet corporis consectetur sapiente, nihil libero. Pariatur doloremque,
        recusandae commodi totam reprehenderit libero quas fuga odit voluptas
        vero aliquid ducimus non distinctio ea repudiandae deleniti et earum
        dolore? Expedita adipisci molestiae obcaecati officiis accusamus
        dolorem, autem tempora iure maiores saepe cumque harum.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
        reiciendis perferendis a libero ipsum, porro possimus ullam saepe vel!
        Quos, nesciunt architecto. Nam ipsum, laboriosam amet veritatis
        dignissimos explicabo quasi vel. Odit et odio possimus, officia itaque
        est ipsa obcaecati laborum. Modi expedita optio, maxime animi eum
        beatae, ratione in ad aut debitis autem voluptatum officiis voluptatibus
        amet corporis consectetur sapiente, nihil libero. Pariatur doloremque,
        recusandae commodi totam reprehenderit libero quas fuga odit voluptas
        vero aliquid ducimus non distinctio ea repudiandae deleniti et earum
        dolore? Expedita adipisci molestiae obcaecati officiis accusamus
        dolorem, autem tempora iure maiores saepe cumque harum.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
        reiciendis perferendis a libero ipsum, porro possimus ullam saepe vel!
        Quos, nesciunt architecto. Nam ipsum, laboriosam amet veritatis
        dignissimos explicabo quasi vel. Odit et odio possimus, officia itaque
        est ipsa obcaecati laborum. Modi expedita optio, maxime animi eum
        beatae, ratione in ad aut debitis autem voluptatum officiis voluptatibus
        amet corporis consectetur sapiente, nihil libero. Pariatur doloremque,
        recusandae commodi totam reprehenderit libero quas fuga odit voluptas
        vero aliquid ducimus non distinctio ea repudiandae deleniti et earum
        dolore? Expedita adipisci molestiae obcaecati officiis accusamus
        dolorem, autem tempora iure maiores saepe cumque harum.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
        reiciendis perferendis a libero ipsum, porro possimus ullam saepe vel!
        Quos, nesciunt architecto. Nam ipsum, laboriosam amet veritatis
        dignissimos explicabo quasi vel. Odit et odio possimus, officia itaque
        est ipsa obcaecati laborum. Modi expedita optio, maxime animi eum
        beatae, ratione in ad aut debitis autem voluptatum officiis voluptatibus
        amet corporis consectetur sapiente, nihil libero. Pariatur doloremque,
        recusandae commodi totam reprehenderit libero quas fuga odit voluptas
        vero aliquid ducimus non distinctio ea repudiandae deleniti et earum
        dolore? Expedita adipisci molestiae obcaecati officiis accusamus
        dolorem, autem tempora iure maiores saepe cumque harum.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
        reiciendis perferendis a libero ipsum, porro possimus ullam saepe vel!
        Quos, nesciunt architecto. Nam ipsum, laboriosam amet veritatis
        dignissimos explicabo quasi vel. Odit et odio possimus, officia itaque
        est ipsa obcaecati laborum. Modi expedita optio, maxime animi eum
        beatae, ratione in ad aut debitis autem voluptatum officiis voluptatibus
        amet corporis consectetur sapiente, nihil libero. Pariatur doloremque,
        recusandae commodi totam reprehenderit libero quas fuga odit voluptas
        vero aliquid ducimus non distinctio ea repudiandae deleniti et earum
        dolore? Expedita adipisci molestiae obcaecati officiis accusamus
        dolorem, autem tempora iure maiores saepe cumque harum.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
        reiciendis perferendis a libero ipsum, porro possimus ullam saepe vel!
        Quos, nesciunt architecto. Nam ipsum, laboriosam amet veritatis
        dignissimos explicabo quasi vel. Odit et odio possimus, officia itaque
        est ipsa obcaecati laborum. Modi expedita optio, maxime animi eum
        beatae, ratione in ad aut debitis autem voluptatum officiis voluptatibus
        amet corporis consectetur sapiente, nihil libero. Pariatur doloremque,
        recusandae commodi totam reprehenderit libero quas fuga odit voluptas
        vero aliquid ducimus non distinctio ea repudiandae deleniti et earum
        dolore? Expedita adipisci molestiae obcaecati officiis accusamus
        dolorem, autem tempora iure maiores saepe cumque harum.
      </div>
    </div>
  );
}

export default Monitoring;
