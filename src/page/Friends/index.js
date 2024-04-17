import UserNotFollow from '../../component/UserNotFollow/UserNotFollow';
function Friends() {
    return (
        <div className="w-full flex justify-center pt-5 mt-16">
            <div className="grid grid-cols-3 gap-4">
                <UserNotFollow />
                <UserNotFollow />
                <UserNotFollow />
            </div>
        </div>
    );
}

export default Friends;
