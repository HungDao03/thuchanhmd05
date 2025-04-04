import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import { toast } from "react-toastify";
import MusicService from "../../../services/music.service.js";

function MusicList() {
    const [musics, setMusics] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        MusicService.getAllMusics().then(res => {
            setMusics(res.data);
        });
    }, [reloadData]);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        MusicService.searchMusicsByName(searchKeyword).then(res => {
            setMusics(res.data);
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    // const handleMusicClick = (music) => {
    //         setSelectedMusic(music);
    // };

    const handleUpdateStatus = (id, newStatus) => {
        MusicService.updateStatus(newStatus, id).then(res => {
            toast.success('Cập nhật trạng thái thành công!');
            setReloadData(!reloadData);
        }).catch(err => {
            toast.error('Cập nhật trạng thái thất bại!');
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary">Music Management</h2>

            {/* Search & Filter */}
            <div className="container mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Create Button */}
                    <Link to="/musics/create">
                        <button className="btn btn-success">
                            <i className="bi bi-plus-lg"></i> Tạo Mới
                        </button>
                    </Link>

                    {/* Search Form */}
                    <form className="d-flex gap-2" onSubmit={handleSubmitSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo tên..."
                            value={searchKeyword}
                            onChange={handleSearchInputChange}
                            style={{ width: "200px" }}
                        />
                        <button className="btn btn-info" type="submit">
                            <i className="bi bi-search"></i> Tìm kiếm
                        </button>
                    </form>
                </div>
            </div>

            {/* Music Table */}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark bg-primary text-white">
                    <tr>
                        {/*onClick={() => Click(music)}*/}
                        <th scope="col">STT</th>
                        <th scope="col">Tên bài hát</th>
                        <th scope="col">Ca sĩ</th>
                        <th scope="col">Nhạc sĩ</th>
                        <th scope="col">Thời gian phát</th>
                        <th scope="col">Số lượng yêu thích</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col" className="text-center">Chức Năng</th>

                    </tr>
                    </thead>
                    <tbody>
                    {musics.length > 0 ? (
                        musics.map((music, index) => (
                            <tr key={music.id} >
                                <th scope="row">{index + 1}</th>
                                <td>{music.title}</td>
                                <td>{music.singer}</td>
                                <td>{music.composer}</td>
                                <td>{music.duration}</td>
                                <td>{music.likes}</td>
                                <td>{music.status}</td>
                                <td className="text-center">
                                    <button
                                        className={`btn ${music.status === 'Công Khai' ? 'btn-success' : 'btn-danger'}`}
                                        onClick={() => {
                                            const confirmed = window.confirm(
                                                `Bạn có chắc chắn muốn ${music.status === 'Công Khai' ? 'Lưu Trữ' : 'Công Khai'} bài hát này không?`
                                            );
                                            if (confirmed) {
                                                handleUpdateStatus(music.id, music.status === 'Công Khai' ? 'Lưu Trữ' : 'Công Khai');
                                            }
                                        }}
                                    >
                                        {music.status === 'Công Khai' ? 'Lưu Trữ' : 'Công Khai'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Không tìm thấy bài hát nào</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>


            {selectedMusic && (
                <div>
                    <p>{selectedMusic.singer}</p>
                    <p>{selectedMusic.composer}</p>
                </div>
            )}
        </div>
    );
}

export default MusicList;
