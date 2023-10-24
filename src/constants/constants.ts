export const enum Experience {
    Internship = 'INTERNSHIP',
    Entry = 'ENTRY',
    MidSenior = 'MID-SENIOR',
    Director = 'DIRECTOR',
    Executive = 'EXECUTIVE'
}


export const Entrypoints = {
    'google':'https://www.google.com/search?q=google+jobs&rlz=1C1ONGR_enUS1029US1029&oq=google+jobs&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhAMgcIAhAAGI8CMgYIAxBFGDzSAQg1NjE0ajBqMagCALACAA&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwjxpLS95PmBAxWJGFkFHfQGDaQQudcGKAF6BAgSECs#htivrt=jobs&htidocid=hQmc_n88CM4oQpB3AAAAAA%3D%3D&fpstate=tldetail',
    'glassdoor':'https://www.glassdoor.com/Job/united-states-jobs-SRCH_IL.0,13_IN1_KO14,15.htm',
    'indeed':'https://www.indeed.com/jobs?q=&l=United%20States'
}

/*
    Google stuff
*/

export const google_SearchRadiusMapping: [number, string][] = [
    //'Anywhere': '#choice_box_root > div.KzzVYe > div:nth-child(3) > div.Z9mODb > div.TRwkpf.GbaVB.yjYmLb.sel',
    [200, '#choice_box_root > div.KzzVYe > div:nth-child(3) > div.Z9mODb > div.TRwkpf.GbaVB.sel'],
    [60, '#choice_box_root > div.KzzVYe > div:nth-child(3) > div.Z9mODb > div:nth-child(5)'],
    [30, '#choice_box_root > div.KzzVYe > div:nth-child(3) > div.Z9mODb > div:nth-child(4)'],
    [15, '#choice_box_root > div.KzzVYe > div:nth-child(3) > div.Z9mODb > div:nth-child(3)'],
    [5, '#choice_box_root > div.KzzVYe > div:nth-child(3) > div.Z9mODb > div:nth-child(2)'],
    [0, '#choice_box_root > div.KzzVYe > div:nth-child(3) > div.Z9mODb > div.TRwkpf.GbaVB.FNTPQd'], // aka 2mi
]

export const google_DatePostedMapping: [number, string][] = [
    //'Anytime' : #choice_box_root > div.KzzVYe > div:nth-child(4) > div.JMgW3.tl-single-select > div.eNr05b.nCJzle.GbaVB.ZkkK1e.yUTMj.k1U36b.sel > div
    [30, '#choice_box_root > div.KzzVYe > div:nth-child(4) > div.JMgW3.tl-single-select > div:nth-child(5) > div'],
    [7, '#choice_box_root > div.KzzVYe > div:nth-child(4) > div.JMgW3.tl-single-select > div:nth-child(4) > div'],
    [3, '#choice_box_root > div.KzzVYe > div:nth-child(4) > div.JMgW3.tl-single-select > div:nth-child(3) > div'],
    [1, '#choice_box_root > div.KzzVYe > div:nth-child(4) > div.JMgW3.tl-single-select > div:nth-child(2) > div'], // aka 1 dat ago day
]

export const google_JobExpMapping = {
    'no-degree': '#choice_box_root > div.KzzVYe > div:nth-child(5) > div.JMgW3 > div:nth-child(2)',
    'no-experience': '#choice_box_root > div.KzzVYe > div:nth-child(5) > div.JMgW3 > div:nth-child(3)',
    'under3yrs': '#choice_box_root > div.KzzVYe > div:nth-child(5) > div.JMgW3 > div:nth-child(4)',
    'over3yrs': '#choice_box_root > div.KzzVYe > div:nth-child(5) > div.JMgW3 > div:nth-child(5)'
}


/*
    Glassdoor stuff
*/

export const glassdoor_SearchRadiusMapping: [number, string][] = [
    [100, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(7) > div:nth-child(2) > ul > li:nth-child(7) > button'],
    [50, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(7) > div:nth-child(2) > ul > li:nth-child(6) > button'],
    [25, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(7) > div:nth-child(2) > ul > li:nth-child(5) > button'],
    [15, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(7) > div:nth-child(2) > ul > li:nth-child(4) > button'],
    [10, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(7) > div:nth-child(2) > ul > li:nth-child(3) > button'],
    [5, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(7) > div:nth-child(2) > ul > li:nth-child(2) > button'],
]

export const glassdoor_DatePostedMapping: [number, string][] = [
    [30, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(5) > div.SearchFiltersBar_dropdown__L5Qbc > ul > li:nth-child(6) > button'],
    [14, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(5) > div.SearchFiltersBar_dropdown__L5Qbc > ul > li:nth-child(5) > button'],
    [7, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(5) > div.SearchFiltersBar_dropdown__L5Qbc > ul > li:nth-child(4) > button'],
    [3, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(5) > div.SearchFiltersBar_dropdown__L5Qbc > ul > li:nth-child(3) > button'],
    [1, '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(5) > div.SearchFiltersBar_dropdown__L5Qbc > ul > li:nth-child(2) > button'],
]

export const glassdoor_JobExpMapping = {
    1: '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(11) > div:nth-child(2) > ul > li:nth-child(2) > button > div',
    2: '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(11) > div:nth-child(2) > ul > li:nth-child(3) > button > div',
    3: '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(11) > div:nth-child(2) > ul > li:nth-child(4) > button > div',
    4: '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(11) > div:nth-child(2) > ul > li:nth-child(5) > button > div',
    5: '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(11) > div:nth-child(2) > ul > li:nth-child(6) > button > div',
}

export const glassdoor_DropDownSelector = '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > button > svg'
export const glassdoor_SeniorityLevelSelector = '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(11) > div > button.SearchFiltersBar_pillRight__LwdMS'
export const glassdoor_DistanceLevelSelector = '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(7) > div.SearchFiltersBar_filterLabel__jFhCl.SearchFiltersBar_accordionHeader__egm2x'
export const glassdoor_ApplyFilterButtonSelector = '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div.SearchFiltersExpanded_menuActions__cjCL_ > button:nth-child(2)'
export const glassdoor_DateDropDownSelector = '#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(5) > div > button.SearchFiltersBar_pillRight__LwdMS'
export const glassdoor_TotalJobCountSelector = 'h1.SearchResultsHeader_jobCount__12dWB'
export const glassdoor_ClosePopUpSelector = 'body > div.ModalContainer > div.Modal > div.closeButtonWrapper > button'
export const glassdoor_MoreJobsButtonSelector = '#left-column > div.JobsList_wrapper__wgimi > div > button'
export const glassdoor_ulSelector = '#left-column > div.JobsList_wrapper__wgimi > ul'




/*
    Indeed stuff
*/

export const indeed_DatePostedMapping: [number, string][] = [
    [14, '#filter-dateposted-menu > li:nth-child(4) > a'],
    [7, '#filter-dateposted-menu > li:nth-child(3)'],
    [3, '#filter-dateposted-menu > li:nth-child(2)'],
    [1, '#filter-dateposted-menu > li:nth-child(1)'],
]

export const indeed_SearchRadiusMapping: [number, string][] = [
    [100, '#filter-radius-menu > li:nth-child(8)'],
    [50, '#filter-radius-menu > li:nth-child(7)'],
    [35, '#filter-radius-menu > li:nth-child(7)'],
    [25, '#filter-radius-menu > li:nth-child(5)'],
    [15, '#filter-radius-menu > li:nth-child(4)'],
    [10, '#filter-radius-menu > li:nth-child(3)'],
    [5, '#filter-radius-menu > li:nth-child(2)'],
]


export const indeed_JobExpMapping = {
    0: '#filter-explvl-menu > li:nth-child(1)',
    1: '#filter-explvl-menu > li:nth-child(2) > a',
    2: '#filter-explvl-menu > li:nth-child(3) > a',
    3: '#filter-explvl-menu > li:nth-child(4) > a'
}


export const linkedin_DatePostedMapping: [number, string][] = [
    [30, '#f_TPR-2'],
    [7, '#f_TPR-1'],
    [1, '#f_TPR-0']
]

export const linkedin_SearchRadiusMapping: [number, string][] = [
    [100,'#distance-4'],
    [75,'#distance-3'],
    [50,'#distance-2'],
    [25,'#distance-1'],
    [10,'#distance-0']
]

export const linkedin_JobExpMappings = {
    'INTERNSHIP': ['Internship', 'Entry Level'],
    'ENTRY': ['Internship', 'Entry Level', 'Associate'],
    'MID-SENIOR': ['Associate', 'Mid-Senior'],
    'DIRECTOR': ['Director'],
    'EXECUTIVE': ['Executive'],
}
