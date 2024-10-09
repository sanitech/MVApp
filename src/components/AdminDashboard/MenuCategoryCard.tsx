import React from "react";

const MenuCategoryCard = () => {
  return (
    <div>
      <div className="w-fit px-9 py-3 mx-1 my-1 flex flex-col space-y-3 justify-center items-center rounded-lg border-solid border border-gray-300  bg-white cursor-pointer">
        <svg
          viewBox="0 0 25 25"
          width={22}
          height={22}
          fill="currentColor"
          className="text-black "
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M16.9977 1.2416L16.4455 0.689198L16.4453 0.689365L16.9977 1.2416ZM16.9977 3.45054L16.4453 4.00277L16.4454 4.00286L16.9977 3.45054ZM21.5499 8.00277L22.1024 7.45058L22.1023 7.45045L21.5499 8.00277ZM23.7599 5.79383L24.3124 5.24164L24.3122 5.24145L23.7599 5.79383ZM19.2066 1.2416L19.7589 0.689218L19.7589 0.689198L19.2066 1.2416ZM18.1022 0.784211V0.00311472V0.784211ZM16.4453 0.689365C16.006 1.1288 15.7592 1.72471 15.7592 2.34607H17.3214C17.3214 2.13895 17.4037 1.94031 17.5501 1.79383L16.4453 0.689365ZM15.7592 2.34607C15.7592 2.96743 16.006 3.56334 16.4453 4.00277L17.5501 2.8983C17.4037 2.75183 17.3214 2.55319 17.3214 2.34607H15.7592ZM16.4454 4.00286L20.9976 8.55509L22.1023 7.45045L17.55 2.89822L16.4454 4.00286ZM20.9975 8.55496C21.215 8.77262 21.4733 8.94529 21.7576 9.06312L22.3558 7.61999C22.261 7.5807 22.1749 7.52314 22.1024 7.45058L20.9975 8.55496ZM21.7576 9.06312C22.0419 9.18096 22.3466 9.24164 22.6544 9.24172L22.6547 7.67953C22.5522 7.6795 22.4506 7.65927 22.3558 7.61999L21.7576 9.06312ZM22.6544 9.24172C22.9621 9.24179 23.2669 9.18125 23.5512 9.06355L22.9537 7.62013C22.8589 7.65937 22.7573 7.67955 22.6547 7.67953L22.6544 9.24172ZM23.5512 9.06355C23.8356 8.94585 24.0939 8.77329 24.3116 8.55574L23.2072 7.45084C23.1346 7.52337 23.0485 7.58089 22.9537 7.62013L23.5512 9.06355ZM24.3116 8.55574C24.5292 8.33818 24.7019 8.07989 24.8198 7.7956L23.3766 7.19743C23.3373 7.2922 23.2798 7.37831 23.2072 7.45084L24.3116 8.55574ZM24.8198 7.7956C24.9376 7.51131 24.9983 7.20659 24.9983 6.89885L23.4362 6.89848C23.4361 7.00107 23.4159 7.10265 23.3766 7.19743L24.8198 7.7956ZM24.9983 6.89885C24.9984 6.59111 24.9379 6.28636 24.8202 6.00202L23.3768 6.5995C23.416 6.6943 23.4362 6.79589 23.4362 6.89848L24.9983 6.89885ZM24.8202 6.00202C24.7025 5.71768 24.5299 5.4593 24.3124 5.24164L23.2075 6.34602C23.28 6.41857 23.3375 6.50471 23.3768 6.5995L24.8202 6.00202ZM24.3122 5.24145L19.7589 0.689218L18.6544 1.79398L23.2077 6.34621L24.3122 5.24145ZM19.7589 0.689198C19.3195 0.249899 18.7235 0.00311472 18.1022 0.00311472V1.56531C18.3093 1.56531 18.5079 1.64757 18.6544 1.794L19.7589 0.689198ZM18.1022 0.00311472C17.4808 0.00311472 16.8849 0.249899 16.4455 0.689198L17.5499 1.794C17.6964 1.64757 17.8951 1.56531 18.1022 1.56531V0.00311472Z"
              fill="currentColor"
            ></path>{" "}
            <path
              d="M12.5781 1.24057L13.1303 1.79307L13.1314 1.79193L12.5781 1.24057ZM12.5781 3.45055L13.1304 2.89823L13.1303 2.89806L12.5781 3.45055ZM21.5503 12.4227L20.998 12.9751L20.9985 12.9756L21.5503 12.4227ZM23.7593 10.2096L23.2069 10.7619L23.2075 10.7625L23.7593 10.2096ZM14.7912 1.24057L14.2379 1.79193L14.2389 1.79286L14.7912 1.24057ZM13.6847 0.781096V0V0.781096ZM12.026 0.688076C11.8082 0.90569 11.6355 1.16408 11.5176 1.44848L12.9608 2.04653C13.0001 1.95173 13.0577 1.8656 13.1303 1.79307L12.026 0.688076ZM11.5176 1.44848C11.3998 1.73288 11.3391 2.03771 11.3391 2.34556H12.9013C12.9013 2.24294 12.9215 2.14133 12.9608 2.04653L11.5176 1.44848ZM11.3391 2.34556C11.3391 2.65341 11.3998 2.95825 11.5176 3.24265L12.9608 2.64459C12.9215 2.54979 12.9013 2.44818 12.9013 2.34556H11.3391ZM11.5176 3.24265C11.6355 3.52704 11.8082 3.78543 12.026 4.00305L13.1303 2.89806C13.0577 2.82552 13.0001 2.73939 12.9608 2.64459L11.5176 3.24265ZM12.0258 4.00287L20.998 12.9751L22.1026 11.8704L13.1304 2.89823L12.0258 4.00287ZM20.9985 12.9756C21.2164 13.1931 21.475 13.3655 21.7596 13.4831L22.3561 12.0393C22.2611 12 22.1748 11.9425 22.1021 11.8699L20.9985 12.9756ZM21.7596 13.4831C22.0442 13.6006 22.3491 13.661 22.657 13.6607L22.6555 12.0985C22.5528 12.0986 22.451 12.0785 22.3561 12.0393L21.7596 13.4831ZM22.657 13.6607C22.9649 13.6604 23.2697 13.5995 23.554 13.4814L22.9548 12.0387C22.86 12.0781 22.7583 12.0984 22.6555 12.0985L22.657 13.6607ZM23.554 13.4814C23.8384 13.3633 24.0967 13.1904 24.3142 12.9725L23.2085 11.8689C23.1359 11.9416 23.0497 11.9993 22.9548 12.0387L23.554 13.4814ZM24.3142 12.9725C24.5317 12.7545 24.7041 12.4959 24.8217 12.2114L23.3778 11.6149C23.3386 11.7098 23.2811 11.7961 23.2085 11.8689L24.3142 12.9725ZM24.8217 12.2114C24.9392 11.9268 24.9996 11.6219 24.9993 11.314L23.4371 11.3155C23.4372 11.4182 23.4171 11.5199 23.3778 11.6149L24.8217 12.2114ZM24.9993 11.314C24.999 11.0061 24.9381 10.7013 24.82 10.4169L23.3773 11.0161C23.4167 11.111 23.437 11.2127 23.4371 11.3155L24.9993 11.314ZM24.82 10.4169C24.7019 10.1326 24.529 9.8743 24.311 9.6568L23.2075 10.7625C23.2802 10.8351 23.3379 10.9212 23.3773 11.0161L24.82 10.4169ZM24.3116 9.65735L15.3436 0.688285L14.2389 1.79286L23.2069 10.7619L24.3116 9.65735ZM15.3445 0.689212C15.1268 0.470755 14.8681 0.297422 14.5833 0.179151L13.9842 1.62191C14.0792 1.66133 14.1654 1.71911 14.2379 1.79193L15.3445 0.689212ZM14.5833 0.179151C14.2985 0.0608808 13.9931 0 13.6847 0V1.56219C13.7875 1.56219 13.8893 1.58249 13.9842 1.62191L14.5833 0.179151ZM13.6847 0C13.3763 0 13.0709 0.0608808 12.7861 0.179151L13.3851 1.62191C13.4801 1.58249 13.5819 1.56219 13.6847 1.56219V0ZM12.7861 0.179151C12.5012 0.297422 12.2425 0.470755 12.0248 0.689212L13.1314 1.79193C13.204 1.71911 13.2902 1.66133 13.3851 1.62191L12.7861 0.179151Z"
              fill="currentColor"
            ></path>{" "}
            <path
              d="M1.24154 16.9979L1.79394 17.5501L1.79403 17.55L1.24154 16.9979ZM3.45152 16.9979L2.89902 17.55L2.8992 17.5502L3.45152 16.9979ZM8.00375 21.5501L8.56566 21.0074L8.55606 20.9978L8.00375 21.5501ZM5.79481 23.759L5.24247 24.3115L5.25217 24.3209L5.79481 23.759ZM1.24154 19.2068L0.689134 19.7591L0.689281 19.7592L1.24154 19.2068ZM0.784147 18.1023H0.00305116H0.784147ZM1.79403 17.55C1.86657 17.4774 1.9527 17.4199 2.0475 17.3806L1.44944 15.9374C1.16504 16.0552 0.906653 16.228 0.689041 16.4457L1.79403 17.55ZM2.0475 17.3806C2.1423 17.3413 2.24391 17.3211 2.34653 17.3211V15.7589C2.03868 15.7589 1.73384 15.8195 1.44944 15.9374L2.0475 17.3806ZM2.34653 17.3211C2.44915 17.3211 2.55076 17.3413 2.64555 17.3806L3.24361 15.9374C2.95921 15.8195 2.65438 15.7589 2.34653 15.7589V17.3211ZM2.64555 17.3806C2.74035 17.4199 2.82648 17.4774 2.89902 17.55L4.00401 16.4457C3.7864 16.228 3.52801 16.0552 3.24361 15.9374L2.64555 17.3806ZM2.8992 17.5502L7.45143 22.1024L8.55606 20.9978L4.00384 16.4456L2.8992 17.5502ZM7.44191 22.0927C7.58419 22.2401 7.66292 22.4374 7.66114 22.6422L9.22328 22.6557C9.22862 22.0413 8.99243 21.4494 8.56558 21.0075L7.44191 22.0927ZM7.66114 22.6422C7.65937 22.847 7.57722 23.0429 7.4324 23.1877L8.53703 24.2923C8.9715 23.8579 9.21794 23.2701 9.22328 22.6557L7.66114 22.6422ZM7.4324 23.1877C7.28757 23.3325 7.09167 23.4147 6.88687 23.4164L6.90044 24.9786C7.51484 24.9732 8.10257 24.7268 8.53703 24.2923L7.4324 23.1877ZM6.88687 23.4164C6.68206 23.4182 6.48476 23.3395 6.33744 23.1972L5.25217 24.3209C5.69412 24.7477 6.28604 24.9839 6.90044 24.9786L6.88687 23.4164ZM6.34706 23.2067L1.79379 18.6544L0.689281 19.7592L5.24255 24.3114L6.34706 23.2067ZM1.79394 18.6546C1.6475 18.5081 1.56524 18.3095 1.56524 18.1023H0.00305116C0.00305116 18.7237 0.249836 19.3196 0.689134 19.7591L1.79394 18.6546ZM1.56524 18.1023C1.56524 17.8952 1.6475 17.6966 1.79394 17.5501L0.689134 16.4456C0.249835 16.8851 0.00305116 17.481 0.00305116 18.1023H1.56524Z"
              fill="currentColor"
            ></path>{" "}
            <path
              d="M1.24109 12.5779L1.79219 13.1315L1.79333 13.1303L1.24109 12.5779ZM3.45003 12.5779L4.00235 12.0256L4.00227 12.0255L3.45003 12.5779ZM12.4222 21.5501L12.9749 20.9982L12.9745 20.9978L12.4222 21.5501ZM10.2091 23.7601L10.7618 23.2082L10.7614 23.2078L10.2091 23.7601ZM1.24109 14.7921L1.79341 14.2397L1.79219 14.2385L1.24109 14.7921ZM0.781096 13.685H1.56219H0.781096ZM1.79333 13.1303C1.93981 12.9839 2.13845 12.9016 2.34556 12.9016V11.3394C1.72421 11.3394 1.12829 11.5862 0.688859 12.0255L1.79333 13.1303ZM2.34556 12.9016C2.55268 12.9016 2.75132 12.9839 2.8978 13.1303L4.00227 12.0255C3.56284 11.5862 2.96692 11.3394 2.34556 11.3394V12.9016ZM2.89771 13.1302L11.8699 22.1024L12.9745 20.9978L4.00235 12.0256L2.89771 13.1302ZM11.8695 22.102C12.0162 22.2489 12.0985 22.4481 12.0984 22.6557L13.6606 22.6568C13.661 22.0349 13.4144 21.4382 12.9749 20.9982L11.8695 22.102ZM12.0984 22.6557C12.0982 22.8632 12.0156 23.0623 11.8687 23.2089L12.9726 24.3144C13.4127 23.8749 13.6601 23.2787 13.6606 22.6568L12.0984 22.6557ZM11.8687 23.2089C11.7218 23.3556 11.5227 23.4379 11.3151 23.4378L11.314 25C11.9359 25.0004 12.5325 24.7538 12.9726 24.3144L11.8687 23.2089ZM11.3151 23.4378C11.1075 23.4377 10.9085 23.3551 10.7618 23.2082L9.65641 24.312C10.0959 24.7521 10.6921 24.9996 11.314 25L11.3151 23.4378ZM10.7614 23.2078L1.79341 14.2397L0.688775 15.3444L9.6568 24.3124L10.7614 23.2078ZM1.79219 14.2385C1.71929 14.166 1.66145 14.0797 1.62198 13.9847L0.179364 14.5841C0.297773 14.8691 0.471305 15.1279 0.689997 15.3456L1.79219 14.2385ZM1.62198 13.9847C1.58251 13.8897 1.56219 13.7879 1.56219 13.685H0C0 13.9936 0.0609545 14.2991 0.179364 14.5841L1.62198 13.9847ZM1.56219 13.685C1.56219 13.5821 1.58251 13.4803 1.62198 13.3853L0.179364 12.7859C0.0609545 13.0708 0 13.3764 0 13.685H1.56219ZM1.62198 13.3853C1.66145 13.2903 1.71929 13.204 1.79219 13.1315L0.689997 12.0244C0.471305 12.2421 0.297773 12.5009 0.179364 12.7859L1.62198 13.3853Z"
              fill="currentColor"
            ></path>{" "}
            <path
              d="M6.83154 15.9598L6.27922 15.4075C6.13274 15.554 6.05044 15.7527 6.05044 15.9598C6.05044 16.167 6.13274 16.3657 6.27922 16.5122L6.83154 15.9598ZM15.9595 6.83186L16.5118 6.27954C16.3654 6.13305 16.1667 6.05076 15.9595 6.05076C15.7524 6.05076 15.5537 6.13305 15.4072 6.27954L15.9595 6.83186ZM18.1688 9.04113L18.7211 9.59345C19.0261 9.28841 19.0261 8.79385 18.7211 8.48881L18.1688 9.04113ZM9.04081 18.1691L8.48849 18.7214C8.63498 18.8679 8.83365 18.9502 9.04081 18.9502C9.24797 18.9502 9.44665 18.8679 9.59313 18.7214L9.04081 18.1691ZM7.38386 16.5122L16.5118 7.38418L15.4072 6.27954L6.27922 15.4075L7.38386 16.5122ZM15.4072 7.38418L17.6165 9.59345L18.7211 8.48881L16.5118 6.27954L15.4072 7.38418ZM17.6165 8.48881L8.48849 17.6168L9.59313 18.7214L18.7211 9.59345L17.6165 8.48881ZM9.59313 17.6168L7.38386 15.4075L6.27922 16.5122L8.48849 18.7214L9.59313 17.6168Z"
              fill="currentColor"
            ></path>{" "}
          </g>
        </svg>
        <span className="text-gray-900 text-sm font-thin">Fitness</span>
      </div>
    </div>
  );
};

export default MenuCategoryCard;
