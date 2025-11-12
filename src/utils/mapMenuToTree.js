export default function mapMenuToTree(menu){
    return menu.map((item)=>{
        return {
            label: item.name,
            url: item.url,
            children: item.children ? mapMenuToTree(item.children) : [],
        }
    })
}