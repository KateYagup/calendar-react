const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endTime: moment().add(1, 'hour').format('HH:mm'),
});

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
};

...

<div className="event-form__time">
    <input
        type="date"
        name="date"
        value={formState.date}
        className="event-form__field"
        onChange={onChange}
        required
    />
    <input
        type="time"
        name="startTime"
        value={formState.startTime}
        className="event-form__field event-form__field_time"
        onChange={onChange}
        required
    />
    <span>-</span>
    <input
        type="time"
        name="endTime"
        value={formState.endTime}
        className="event-form__field event-form__field_time"
        onChange={onChange}
        required
    />
</div>