import { LaptopOutlined, PieChartTwoTone, CameraTwoTone, SettingTwoTone } from '@ant-design/icons';
import clsx from 'clsx';
// import { usePathname } from 'next/navigation';

const tags = [{ name: 'Computer Science', icon: LaptopOutlined },
{ name: 'Accounting', icon: PieChartTwoTone },
{ name: 'Photography', icon: CameraTwoTone },
{ name: 'Engineering', icon: SettingTwoTone }];

export default function Tag() {
    return (
        <div className='flex flex-row gap-5 pt-5 px-20 flex-wrap'>
            {tags.map((tag) => {
                const TagIcon = tag.icon;
                return (
                    <div
                        key={tag.name}
                        className={clsx(
                            'flex grow h-[40px] items-center justify-center cursor-pointer p-3 text-sm font-medium border-2 border-gray-200 rounded-full bg-gray-100 hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-5',
                            {},
                        )}
                    >
                        <TagIcon className="w-6" />
                        <p className="hidden md:block">{tag.name}</p>
                    </div>
                );
            })}
        </div>
    );
};