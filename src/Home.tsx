import React, { useEffect, useState } from 'react';
import ResetImage from './images/Frame 9.png';

const Home = () => {
    const [earnings, setEarnings] = useState([{ "earning": '', "checked": false }]);
    const [deductions, setDeductions] = useState([{ "deduction": '' }]);
    const [basicSalary, setBasicSalary] = useState("");
    const [grossEarning, setGrossEarning] = useState("0.0");
    const [grossDeduction, setGrossDeduction] = useState("0.0");
    const [employeeEPF, setEmployeeEPF] = useState("0.0");
    const [employerEPF, setEmployerEPF] = useState("0.0");
    const [employerETF, setEmployerETF] = useState("0.0");
    const [netSalary, setNetSalary] = useState("0.0");
    const [ctc, setCTC] = useState("0.0");
    let totalEarnings: number = 0;
    let totalDeductions: number = 0;
    let totalCheckedEarnings: number = 0;

    useEffect(() => {
        let basicSal = window.localStorage.getItem('basicSalary');
        let earning = localStorage.getItem('earning');
        let deduction = localStorage.getItem('deduction');
        setBasicSalary(basicSal ? basicSal : "");
        setEarnings(earning ? JSON.parse(earning) : [{ "earning": '', "checked": false }]);
        setDeductions(deduction ? JSON.parse(deduction) : [{ "deduction": '' }]);
    }, []);

    useEffect(() => {

        for (let i = 0; i < earnings.length; i++) {
            totalEarnings = totalEarnings + Number(earnings[i].earning);
        }
        setGrossEarning((totalEarnings + Number(basicSalary)).toString());

        for (let i = 0; i < deductions.length; i++) {
            totalDeductions = totalDeductions + Number(deductions[i].deduction);
        }
        setGrossDeduction((totalDeductions).toString());

        for (let i = 0; i < earnings.length; i++) {
            if (earnings[i].checked) {
                totalCheckedEarnings = totalCheckedEarnings + Number(earnings[i].earning);
            }
        }

        setEmployeeEPF(((totalCheckedEarnings + Number(basicSalary)) * 0.08).toString());
        setEmployerEPF(((totalCheckedEarnings + Number(basicSalary)) * 0.12).toString());
        setEmployerETF(((totalCheckedEarnings + Number(basicSalary)) * 0.03).toString());

        setNetSalary((totalEarnings + Number(basicSalary) - totalDeductions - ((totalCheckedEarnings + Number(basicSalary)) * 0.08)).toString());
        setCTC((totalEarnings + Number(basicSalary) - totalDeductions + ((totalCheckedEarnings + Number(basicSalary)) * 0.12) + ((totalCheckedEarnings + Number(basicSalary)) * 0.03)).toString());

    }, [earnings, deductions, basicSalary]);

    const handleAddEarning = () => {
        setEarnings([...earnings, { "earning": "", "checked": false }]);
    };

    const handleRemoveEarning = (index: number) => {
        const list = [...earnings];
        list.splice(index, 1);
        setEarnings(list);
    };

    const handleEarningsChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const list: any = [...earnings];
        list[index][name] = value;
        setEarnings(list);
        window.localStorage.setItem('earning', JSON.stringify(list));
    };

    const handleEarningCheckChange = (e: any, index: number) => {
        const { name, checked } = e.target;
        const list: any = [...earnings];
        list[index][name] = checked;
        setEarnings(list);
        window.localStorage.setItem('earning', JSON.stringify(list));
    };

    const handleAddDeduction = () => {
        setDeductions([...deductions, { "deduction": "" }]);
    };

    const handleRemoveDeduction = (index: number) => {
        const list = [...deductions];
        list.splice(index, 1);
        setDeductions(list);
    };

    const handleDeductionsChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const list: any = [...deductions];
        list[index][name] = value;
        setDeductions(list);
        window.localStorage.setItem('deduction', JSON.stringify(list));
    };

    const onSetBasicSalary = (e: any) => {
        setBasicSalary(e.target.value);
        window.localStorage.setItem('basicSalary', e.target.value);
    };

    const onReset = () => {
        setEarnings(([{ "earning": '', "checked": false }]));
        window.localStorage.setItem('earning', JSON.stringify([{ "earning": '', "checked": false }]));
        setDeductions(([{ "deduction": '' }]));
        window.localStorage.setItem('deduction', JSON.stringify([{ "deduction": '' }]));
        setGrossEarning("0.0");
        setGrossDeduction("0.0");
        setBasicSalary("");
        window.localStorage.setItem('basicSalary', "");
        setNetSalary("0.0");
        setCTC("0.0");
    };

    return (
        <>
            <div className="my-12 mx-2.5 sm:mx-11 md:my-[132px] md:mx-[130px] xl:justify-center lg:flex ">
                <div className='px-2 py-4  sm:px-10 sm:py-6 text-left lg:w-[680px] lg:mr-5 bg-gray-98 border rounded-lg border-gray-dark '>
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-bold leading-8 '>Calculate your Salary</h2>
                        <img onClick={() => { onReset(); }} src={ResetImage} className=' w-auto h-6' alt="ResetImage" />
                    </div>

                    <h3 className='text-base font-semibold leading-6  mt-6'>Basic Salary</h3>

                    <input value={basicSalary} onChange={(e) => { onSetBasicSalary(e); }} className="w-48 xl:w-[380px] border rounded my-2 h-12 py-3 px-3 text-gray-700 leading-tight focus:shadow-outline border-gray-dark" id="basicSalary" type="text" />

                    <div>
                        <h3 className='text-base font-semibold leading-6 mb-1 mt-4'>Earnings</h3>

                        <p className='text-xs leading-5 font-normal'>Allowance, Fixed Allowance, Bonus and etc.</p>

                        {earnings.map((singleEarning, i) => (
                            <div key={i} className='flex'>
                                <input
                                    onChange={(e) => handleEarningsChange(e, i)}
                                    value={singleEarning.earning}
                                    className="w-48 xl:w-[380px] border rounded mt-2  h-12 py-3 px-3 text-gray-700 leading-tight focus:shadow-outline border-gray-dark" id="earning" type="text" name="earning" />
                                <div onClick={() => handleRemoveEarning(i)} className='bg-white-smoke rounded-full w-8 h-8 ml-4 flex justify-center items-center my-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className='my-2 flex items-center ml-5'>
                                    <input type="checkbox" className='w-[18px] h-[18px] mr-3'
                                        name="checked"
                                        checked={singleEarning.checked ? true : false}
                                        onChange={(e) => handleEarningCheckChange(e, i)} />
                                    <p>EPF/ETF</p>
                                </div>
                            </div>
                        ))}
                        <div className='flex my-2.5 mb-[18px]' onClick={() => { handleAddEarning(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-cyan-blue flex align-middle justify-center h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <button className='text-cyan-blue text-sm leading-5 font-medium'>Add New Allowance</button>
                        </div>
                    </div>

                    <div className='bg-gray-dark h-px w-full '></div>

                    <div>
                        <h3 className='text-base font-semibold leading-6 mb-1 mt-6'>Deductions</h3>
                        <p className='text-xs leading-5 font-normal'>Salary Advances, Loan Deductions and all</p>
                        {deductions.map((singleDeduction, i) => (
                            <div key={i} className='flex'>
                                <input
                                    onChange={(e) => handleDeductionsChange(e, i)}
                                    value={singleDeduction.deduction} className="w-48 xl:w-[380px] border rounded my-2 h-12 py-3 px-3 text-gray-700 leading-tight focus:shadow-outline border-gray-dark" id="deductions" name="deduction" type="text" />
                                <div onClick={() => handleRemoveDeduction(i)} className='bg-white-smoke rounded-full w-8 h-8 ml-4 flex justify-center items-center my-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                        <div className='flex my-2.5'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-cyan-blue flex align-middle justify-center h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <button className='text-cyan-blue text-sm leading-5 font-medium ' onClick={() => { handleAddDeduction(); }}>Add New Deduction</button>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[480px] px-8 py-6 text-left  lg:mr-5 mt-3 lg:mt-0 bg-white border rounded-lg border-gray-dark'>
                    <h2 className='text-xl font-bold leading-8 '>Your Salary</h2>

                    <div className='flex justify-between mt-[25px] my-2'>
                        <h4 className='leading-5 font-semibold text-sm text-ash'>Items</h4>
                        <h4 className='leading-5 font-semibold text-sm text-ash'>Amount</h4>
                    </div>

                    <div className='flex justify-between my-2'>
                        <p className='text-base font-normal leading-6 '>Basic Salary</p>
                        <p className='text-base font-normal leading-6 '>{basicSalary}.00</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='text-base font-normal leading-6 '>Gross Earning</p>
                        <p className='text-base font-normal leading-6 '>{grossEarning}.00</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='text-base font-normal leading-6 '>Gross Deduction</p>
                        <p className='text-base font-normal leading-6 '>{grossDeduction}.00</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='text-base font-normal leading-6 '>Employee EPF (8%)</p>
                        <p className='text-base font-normal leading-6 '>{employeeEPF}.00</p>
                    </div>

                    <div className='static flex justify-between mx-[-20px] my-6 py-4 px-5 border rounded border-gray-dark'>
                        <h3 className='text-base font-semibold leading-6 '>Net Salary (Take Home)</h3>
                        <h3 className='text-base font-semibold leading-6'>{netSalary}.00</h3>
                    </div>

                    <div className='flex justify-between mt-[25px] my-2'>
                        <h4 className='leading-5 font-semibold text-sm text-ash'>Contribution from the Employer</h4>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='text-base font-normal leading-6 '>Employeer EPF (12%)</p>
                        <p className='text-base font-normal leading-6 '>{employerEPF}.00</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='text-base font-normal leading-6 '>Employeer ETF (3%)</p>
                        <p className='text-base font-normal leading-6 '>{employerETF}.00</p>
                    </div>

                    <div className='flex justify-between my-8'>
                        <p className='text-base font-normal leading-6 '>CTC (Cost to Company)</p>
                        <p className='text-base font-normal leading-6 '>{ctc}.00</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;